const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const HttpError = require("../models/http-error");
const User = require("../models/user");

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

function generateRandomPassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

const getUser = async (req, res, next) => {
  const userId = req.params.userid;

  let user;
  try {
    user = await User.findOne({ _id: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for this id.", 404);
    return next(error);
  }

  if (
    userId !== req.userData.userId &&
    req.userData.role !== "admin" &&
    req.userData.role !== "main"
  ) {
    const error = new HttpError("You are not allowed to get this user.", 401);
    return next(error);
  }

  res.status(201).json({ user: user.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image:
      "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    password: hashedPassword,
    places: [],
    role: "user",
    time: Date.now(),
    confirmedEmail: false,
    byGoogle: false,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
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
  let responseEmail = {
    body: {
      name,
      intro: "Follow the link to sign up:",
      outro: `${process.env.DOMAIN}emailconfirmation/${token}`,
    },
  };

  let emailBody = mailGenerator.generate(responseEmail);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}`,
    subject: `MyBox - sign up`,
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      const error = new HttpError(
        "Sending mail failed, please try again later.",
        500
      );
      return next(error);
    }
  });

  res.status(201).json({
    message: "Mail sent successfully, please check your email address.",
  });
};

const googleSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }
  const { name, email, image } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image,
    password: generateRandomPassword(10),
    places: [],
    role: "user",
    time: Date.now(),
    confirmedEmail: true,
    byGoogle: true,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
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

  let responseEmail = {
    body: {
      name,
      intro:
        "Our congratulations! You have been successfully registered on our MyBox website!",
      outro: `Go to our website and start creating gift boxes - ${process.env.DOMAIN}`,
    },
  };

  let emailBody = mailGenerator.generate(responseEmail);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}`,
    subject: `MyBox - successful registration!`,
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // return nothing;
    }
  });

  res.status(201).json({ userId: createdUser.id, token, role: "user" });
};

const confirmEmail = async (req, res, next) => {
  const token = req.params.token;
  if (!token) {
    throw new Error("Confirmation failed!");
  }
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  let user;
  let role;
  try {
    user = await User.findOne({ _id: decodedToken.userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for this id.", 404);
    return next(error);
  }
  if (user.byGoogle) {
    const error = new HttpError(
      "You signed up with google, you can not confirm email!",
      403
    );
    return next(error);
  }

  role = "user";
  user.confirmedEmail = true;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update userr.",
      500
    );
    return next(error);
  }

  res.json({ userId: decodedToken.userId, token, role });
};

const resetPassword = async (req, res, next) => {
  const { email } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Reseting failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid email.", 403);
    return next(error);
  }
  if (existingUser.byGoogle) {
    const error = new HttpError(
      "You signed up with google, you can not reset password!",
      403
    );
    return next(error);
  }
  let randomPassword = generateRandomPassword(10);
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(randomPassword, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  existingUser.password = hashedPassword;
  try {
    await existingUser.save();
  } catch (err) {
    const error = new HttpError(
      "Reseting password failed, please try again.",
      500
    );
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

  let responseEmail = {
    body: {
      name: existingUser.name,
      intro: `New password: ${randomPassword}`,
      outro: `Don't forget to change it to a new one!`,
    },
  };

  let emailBody = mailGenerator.generate(responseEmail);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}`,
    subject: `MyBox - new password`,
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

  res.status(201).json({
    message: "Password sent successfully, please check your email address.",
  });
};

const reconfirmEmail = async (req, res, next) => {
  const { email } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Reconfirmation failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid email.", 403);
    return next(error);
  }
  if (existingUser.byGoogle) {
    const error = new HttpError(
      "You signed up with google, you can not reconfirm email!",
      403
    );
    return next(error);
  }
  if (existingUser.confirmedEmail) {
    const error = new HttpError("Email already confirmed.", 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Reconfirmation email failed, please try again later.",
      500
    );
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

  let responseEmail = {
    body: {
      name: existingUser.name,
      intro: "There is reconfirm link:",
      outro: `${process.env.DOMAIN}emailconfirmation/${token}`,
    },
  };

  let emailBody = mailGenerator.generate(responseEmail);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}`,
    subject: `MyBox - reconfirmation email`,
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      const error = new HttpError(
        "Sending mail failed, please try again later.",
        500
      );
      return next(error);
    }
  });

  res.status(201).json({
    message: "Mail sent successfully, please check your email address.",
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  if (existingUser.byGoogle) {
    const error = new HttpError(
      "You signed up with google, you can not login without google!",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  if (!existingUser.confirmedEmail) {
    const error = new HttpError("Your email is not confirmed!", 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ userId: existingUser._id, token, role: existingUser.role });
};

const googleLogin = async (req, res, next) => {
  const { email } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid user, could not log you in.", 403);
    return next(error);
  }
  if (!existingUser.byGoogle) {
    const error = new HttpError(
      "You signed up without google, you can not login with google!",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ userId: existingUser._id, token, role: existingUser.role });
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);

  const { name, password, newpassword, number, city, post } = req.body;
  const userId = req.params.userid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update uuser.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for this id.", 404);
    return next(error);
  }

  if (
    userId !== req.userData.userId &&
    req.userData.role !== "admin" &&
    req.userData.role !== "main"
  ) {
    const error = new HttpError(
      "You are not allowed to update this user.",
      401
    );
    return next(error);
  }

  if (password && !user.byGoogle) {
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, user.password);
    } catch (err) {
      const error = new HttpError(
        "Could not update password, please check your credentials and try again.",
        500
      );
      return next(error);
    }

    if (!isValidPassword) {
      const error = new HttpError(
        "Invalid credentials, could not update password.",
        403
      );
      return next(error);
    }

    if (newpassword) {
      let hashedNewPassword;
      try {
        hashedNewPassword = await bcrypt.hash(newpassword, 12);
      } catch (err) {
        const error = new HttpError(
          "Could not update password, please try again.",
          500
        );
        return next(error);
      }

      user.password = hashedNewPassword;
    } else {
      const error = new HttpError(
        "Invalid credentials, could not update to new password.",
        403
      );
      return next(error);
    }
  }

  if (!user.byGoogle) {
    user.name = name;
  }

  user.city = city || "";
  user.number = number || "";
  user.post = post || "";

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update userr.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userid;
  let user;
  try {
    user = await User.findById(userId).populate("orders");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete uuser.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for this id.", 404);
    return next(error);
  }

  if (
    userId !== req.userData.userId &&
    req.userData.role !== "admin" &&
    req.userData.role !== "main"
  ) {
    const error = new HttpError(
      "You are not allowed to delete this user.",
      401
    );
    return next(error);
  }

  if (user.role && user.role === "main") {
    const error = new HttpError("You are not allowed to delete the main.", 401);
    return next(error);
  }

  try {
    await user.orders.map((order) => order.deleteOne());
    await user.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted user and associated orders." });
};

exports.getUser = getUser;
exports.signup = signup;
exports.googleSignup = googleSignup;
exports.confirmEmail = confirmEmail;
exports.resetPassword = resetPassword;
exports.reconfirmEmail = reconfirmEmail;
exports.login = login;
exports.googleLogin = googleLogin;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
