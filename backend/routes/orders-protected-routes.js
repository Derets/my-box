const express = require("express");
const { check } = require("express-validator");

const ordersControllers = require("../controllers/orders-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/:userid/orders", ordersControllers.getOrdersByUserId); //+

router.delete("/:userid/orders", ordersControllers.deleteOrdersByUserId); //+

router.patch("/orders/:orderid", ordersControllers.updateOrder);

router.delete("/orders/:orderid", ordersControllers.deleteOrder);

module.exports = router;
