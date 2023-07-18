const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
router.post("/google/signup", usersController.googleSignup);

router.post("/reconfirmemail", usersController.reconfirmEmail);
router.post("/resetpassword", usersController.resetPassword);
router.post("/emailconfirmation/:token", usersController.confirmEmail);
router.post("/login", usersController.login);
router.post("/google/login", usersController.googleLogin);

module.exports = router;
