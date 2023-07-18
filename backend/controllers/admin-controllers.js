const HttpError = require("../models/http-error");
const Order = require("../models/order");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  const userId = req.params.adminId;
  // Check if user is authenticated
  if (userId !== req.userData.userId) {
    const error = new HttpError("You are not allowed to get this users.", 402);
    return next(error);
  }

  // Check if the user is admin
  if (req.userData.role !== "admin" && req.userData.role !== "main") {
    const error = new HttpError("You are not allowed to get users.", 401);
    return next(error);
  }

  // Get all users from database
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!users || users.length === 0) {
    const error = new HttpError("No users found.", 404);
    return next(error);
  }

  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const changeStatus = async (req, res, next) => {
  const { userId, role } = req.body;
  const userIdToChange = req.params.userid;

  // Check if user is authenticated
  if (userId !== req.userData.userId) {
    const error = new HttpError("You are not allowed to get this users.", 401);
    return next(error);
  }

  // Check if the user is main
  if (req.userData.role !== "main") {
    const error = new HttpError("You are not allowed to change users.", 401);
    return next(error);
  }

  let user;
  try {
    user = await User.findById(userIdToChange);
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

  if (req.userData.role !== "admin" && req.userData.role !== "main") {
    const error = new HttpError(
      "You are not allowed to change this user.",
      401
    );
    return next(error);
  }

  if (user.role && user.role === "main") {
    const error = new HttpError("You are not allowed to change the main.", 401);
    return next(error);
  }

  user.role = role && role === "admin" ? "admin" : "user";

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

exports.getUsers = getUsers;
exports.changeStatus = changeStatus;
