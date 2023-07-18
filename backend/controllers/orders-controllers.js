const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
require("dotenv").config();

const HttpError = require("../models/http-error");
const Order = require("../models/order");
const User = require("../models/user");

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const getOrderById = async (req, res, next) => {
  const orderId = req.params.orderid;

  let order;
  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a order.",
      500
    );
    return next(error);
  }

  if (!order) {
    const error = new HttpError(
      "Could not find a order for the provided id.",
      404
    );
    return next(error);
  }
  console.log(order);

  if (
    order.creator.id.toString() !== req.userData.userId &&
    req.userData.role !== "admin" &&
    req.userData.role !== "main"
  ) {
    const error = new HttpError("You are not allowed to get this order.", 401);
    return next(error);
  }

  res.json({ order: order.toObject({ getters: true }) });
};

// getOrdersByUserId

const getOrdersByUserId = async (req, res, next) => {
  const userId = req.params.userid;
  console.log(userId);
  let userWithOrders;
  try {
    userWithOrders = await User.findById(userId).populate("orders");
  } catch (err) {
    const error = new HttpError(
      "Fetching orders failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userWithOrders || userWithOrders.orders.length === 0) {
    return next(
      new HttpError("Could not find orders for the provided user id.", 404)
    );
  }

  if (
    req.userData.userId &&
    userId !== req.userData.userId &&
    req.userData.role !== "admin" &&
    req.userData.role !== "main"
  ) {
    const error = new HttpError("You are not allowed to get this orders.", 401);
    return next(error);
  }
  console.log(userWithOrders.orders);
  res.json({
    orders: userWithOrders.orders.map((order) =>
      order.toObject({ getters: true })
    ),
  });
};

//makeOrder

const makeOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    typeOfBox,
    size,
    colors,
    address,
    creator,
    name,
    amount,
    price,
    comment,
  } = req.body;
  console.log(req.body);

  const makedOrder = new Order({
    typeOfBox,
    size: { length: size.length, width: size.width, height: size.height },
    colors: {
      colorOne: colors.colorOne,
      colorTwo: colors.colorTwo,
      colorThree: colors.colorThree,
    },
    address: {
      email: address.email,
      telNumber: address.telNumber,
      city: address.city,
      postDepartment: address.postDepartment,
    },
    creator,
    time: Date.now(),
    updates: 0,
    amount,
    price,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Making order failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await makedOrder.save({ session: sess });
    user.orders.push(makedOrder);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Making orderr failed, please try again.", 500);
    return next(error);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "MyBox",
      link: process.env.DOMAIN,
    },
  });

  let emailArray = [
    {
      item: "Type of the box",
      description: `${typeOfBox}`,
    },
    {
      item: "Length",
      description: `${size.length}`,
    },
    {
      item: "Width",
      description: `${size.width}`,
    },
    {
      item: "Height",
      description: `${size.height}`,
    },
    {
      item: "Color-1",
      description: `${colors.colorOne}`,
    },
    {
      item: "Color-2",
      description: `${colors.colorTwo}`,
    },
    {
      item: "Color-3",
      description: `${colors.colorThree}`,
    },
    {
      item: "Telephone",
      description: `${address.telNumber}`,
    },
    {
      item: "City",
      description: `${address.city}`,
    },
    {
      item: "Post Department",
      description: `${address.postDepartment}`,
    },
    {
      item: "Creator name",
      description: `${name}`,
    },
    {
      item: "Comment",
      description: `${comment}`,
    },
    {
      item: "Amount",
      description: `${amount}`,
    },
    {
      item: "Price",
      price: `$${price}`,
    },
  ];

  const filteredArray = emailArray.filter(
    (obj) => obj.item !== "Creator name" || obj.description !== undefined
  );

  let responseEmail = {
    body: {
      name: name,
      intro:
        "You have placed a new order for a box with the following characteristics:",
      table: {
        data: filteredArray,
      },

      outro: "Looking forward to your next orders!",
    },
  };

  let emailBody = mailGenerator.generate(responseEmail);

  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: `${address.email}`,
    subject: `MyBox - new order`,
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      const error = new HttpError(
        "Sending mail failed, please try again later(password has been changed).",
        500
      );
      return next(error);
    }
  });

  res.status(201).json({ order: makedOrder });
};

//UpdateOrder

const updateOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { typeOfBox, size, colors, amount, price, comment } = req.body;

  console.log(req.body);
  const orderId = req.params.orderid;
  console.log(orderId);
  let order;
  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update orderr.",
      500
    );
    return next(error);
  }

  if (!order) {
    const error = new HttpError(
      "Could not find a order for the provided id.",
      404
    );
    return next(error);
  }

  if (!typeOfBox || !size || !colors || !amount || !price) {
    const error = new HttpError(
      "Something went wrong, could not update order.",
      500
    );
    return next(error);
  }

  if (
    order.creator.toString() !== req.userData.userId &&
    req.userData.role !== "admin" &&
    req.userData.role !== "main"
  ) {
    const error = new HttpError(
      "You are not allowed to update this order.",
      401
    );
    return next(error);
  }

  order.typeOfBox = typeOfBox;
  order.size = {
    length: size.length,
    width: size.width,
    height: size.height,
  };
  order.colors = {
    colorOne: colors.colorOne,
    colorTwo: colors.colorTwo,
    colorThree: colors.colorThree,
  };
  order.updates = order.updates ? (order.updates += 1) : 1;
  order.amount = amount;
  order.price = price;

  try {
    await order.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update oorder.",
      500
    );
    return next(error);
  }
  console.log(order);
  res.status(200).json({ order: order.toObject({ getters: true }) });
};

//DeleteOrder

const deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderid;
  let order;
  try {
    order = await Order.findById(orderId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete order.",
      500
    );
    return next(error);
  }

  if (!order) {
    const error = new HttpError("Could not find order for this id.", 404);
    return next(error);
  }

  if (
    order.creator.id.toString() !== req.userData.userId &&
    req.userData.role !== "admin" &&
    req.userData.role !== "main"
  ) {
    const error = new HttpError(
      "You are not allowed to delete this order.",
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await order.deleteOne({ session: sess });
    order.creator.orders.pull(order);
    await order.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete orderr.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted order." });
};

// Delete orders

const deleteOrdersByUserId = async (req, res, next) => {
  const userId = req.params.userid;

  let userWithOrders;
  try {
    userWithOrders = await User.findById(userId).populate("orders");
  } catch (err) {
    const error = new HttpError(
      "Fetching orders failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userWithOrders || userWithOrders.orders.length === 0) {
    return next(
      new HttpError("Could not find orders for the provided user id.", 404)
    );
  }

  if (
    req.userData.userId &&
    userId !== req.userData.userId &&
    req.userData.role !== "admin" &&
    req.userData.role !== "main"
  ) {
    const error = new HttpError(
      "You are not allowed to delete this orders.",
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await userWithOrders.orders.map((order) => order.deleteOne());
    userWithOrders.orders = [];
    await userWithOrders.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete orders.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted all orders for this user." });
};

exports.getOrderById = getOrderById;
exports.getOrdersByUserId = getOrdersByUserId;
exports.makeOrder = makeOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
exports.deleteOrdersByUserId = deleteOrdersByUserId;
