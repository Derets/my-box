const express = require("express");
const { check } = require("express-validator");

const ordersControllers = require("../controllers/orders-controllers");

const router = express.Router();

router.post(
  "/ordering",
  [check("typeOfBox").not().isEmpty()],
  ordersControllers.makeOrder
);

module.exports = router;
