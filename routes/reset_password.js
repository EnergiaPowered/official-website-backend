const { User } = require("../models/User");
const router = require("express").Router();
const crypto = require("crypto");
const mailer = require("../methods/mailer");
const jwt = require("jsonwebtoken");
const expire = require("../methods/expire");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const resetPasswordController = require("../controllers/resetPasswordController");

router.post("/forget_password", resetPasswordController.postForgetPassword);

// to validate the password
function validate_password(password) {
  const passwordValidations = {
    min: 8,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 4,
  };
  const schema = Joi.object({
    password: passwordComplexity(passwordValidations).required(),
  });
  return schema.validate(password);
}

router.post("/reset", resetPasswordController.postResetPassword);

module.exports = router;
