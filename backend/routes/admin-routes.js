const express = require("express");
const { check } = require("express-validator");

const adminControllers = require("../controllers/admin-controllers");

const router = express.Router();

router.get("/admin/users/:adminId", adminControllers.getUsers);

router.patch("/admin/:userid", adminControllers.changeStatus);

module.exports = router;
