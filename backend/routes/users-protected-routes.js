const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/:userid", usersController.getUser);

router.patch(
  "/:userid",
  [check("name").not().isEmpty(), check("email").normalizeEmail().isEmail()],
  usersController.updateUser
);

router.delete("/:userid", usersController.deleteUser);

module.exports = router;
