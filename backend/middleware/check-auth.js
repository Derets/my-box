const jwt = require("jsonwebtoken");
require("dotenv").config();

const HttpError = require("../models/http-error");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'SMTH TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    // Check if the user is admin
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

    if (user.role === "main") {
      role = "main";
    } else if (user.role === "admin") {
      role = "admin";
    } else {
      role = "user";
    }

    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      role,
    };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
