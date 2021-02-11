const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const passwordComplexity = require('joi-password-complexity');

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
      requirementCount: 4
    }).required()
  });
  return schema.validate(user);
};

router.post("/login", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: 'Invalid email or password.' });

  // checking if the user verfied his email
  if (!user.verfied) return res.status(400).send({ message: 'Please verfiy your email.' });

  // comparing the password with the database 
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({ message: 'Invalid email or password.' });

  // send the token
  const token = user.generateAuthToken();
  res.send({
    ..._.pick(user, [
      'firstname',
      'lastname',
      'phone',
      'email',
      'password',
      'isGraduated',
      'university',
      'faculty',
      'department',
      'graduationYear'
    ]), token
  });
});

module.exports = router;