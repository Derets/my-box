const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const ordersRoutes = require("./routes/orders-routes");
const ordersProtectedRoutes = require("./routes/orders-protected-routes");
const usersRoutes = require("./routes/users-routes");
const usersProtectedRoutes = require("./routes/users-protected-routes");
const adminRoutes = require("./routes/admin-routes");

// const router = express.Router();

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, X-Requested-With, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/", usersRoutes); // /user/login  - /user/signup
app.use("/", ordersRoutes); //  /ordering

app.use("/", usersProtectedRoutes); // /:userid(3)
app.use("/", ordersProtectedRoutes); // /orders/:orderid (3)- /:userid/orders
app.use("/", adminRoutes);

// app.use(express.static(path.join("public")));

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clustermybox.xxltjfj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
