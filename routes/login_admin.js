const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const passwordComplexity = require("joi-password-complexity");

// Defining a Checking Schema for the SignUp Body
function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity({
      min: 8,
      max: 1024,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 0,
      requirementCount: 4,
    }).required(),
  });
  return schema.validate(user);
}

/**
 * @api {post} /login/admin Post/ login/admin
 * @apiName postUser
 * @apiGroup Login Router
 * @apiVersion 1.0.0
 * @apiSuccess {object} User return the logged in user
 * @apiError (Error 400) valdiationError Something wrong with the body of the request
 * @apiError (Error 400) valdiationError email or password is wrong
 * @apiError (Error 400) verificationError the user didn't verify his/her email
 * @apiError (Error 403) unauthorized the user is not admin
 * @apiHeader (Header) {String} x-auth-token the token when the user signed in
 * @apiBody {String} email The email of the user
 * @apiBody {String} password The password of the user
 * @apiSampleRequest http://127.0.0.1:4000/api/login
 * @apiSuccessExample user:
 * {
    "firstname": "Mostafa",
    "lastname": "Kamal",
    "phone": "01099011598",
    "email": "abdullah.alshawafi@yahoo.com",
    "password": "$2b$10$FleJ0YxYK4u516aZ8lhAUuYjvPDNA0hjcCWsqotgNnXbgIs68HMh2",
    "isGraduated": false,
    "university": "Cairo",
    "faculty": "Engineering",
    "department": "Computer",
    "graduationYear": 2023,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhjYzhmMGJmZGQzYzJjNDg2MTI0Y2UiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjQ1MzU3Mzg0fQ.lmGycZLLw-9Io8449csZfqrNLV6CYDzullw6QunWMDw"
}
 */
router.post("/login/admin", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "Invalid email or password." });

  // checking if the user verfied his email
  if (!user.verified)
    return res.status(400).send({ message: "Please verfiy your email." });

  // checking if the user verfied his email
  if (!user.isAdmin) return res.status(403).send({ message: "unauthorized" });

  // comparing the password with the database
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid email or password." });

  // send the token
  const token = user.generateAuthToken();
  res.send({
    ..._.pick(user, [
      "firstname",
      "lastname",
      "phone",
      "email",
      "password",
      "isGraduated",
      "university",
      "faculty",
      "department",
      "graduationYear",
    ]),
    token,
  });
});

module.exports = router;
