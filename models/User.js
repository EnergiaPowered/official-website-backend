const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
// user database schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 15,
    unique: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  university: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  faculty: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  department: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    default: "None"
  },
  graduationYear: {
    type: Number,
    required: true
  },
  isGraduated: {
    type: Boolean,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// function to generate the token with PAYLOAD
userSchema.methods.generateAuthToken = function () {
  payload = { _id: this._id, isAdmin: this.isAdmin };
  const token = jwt.sign(payload, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

// Defining a Checking Schema for the User Body

exports.User = User;
exports.validate = function (user) {
  const passwordValidations = {
    min: 8,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 4
  }

  const schema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(7).max(15).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(passwordValidations).required(),
    confirm_password: passwordComplexity(passwordValidations).required(),
    university: Joi.string().min(2).max(100).required(),
    faculty: Joi.string().min(2).max(100).required(),
    department: Joi.string().min(2).max(100).allow(""),
    graduationYear: Joi.number()
      .min(new Date(Date.now()).getFullYear() - 7)
      .max(new Date(Date.now()).getFullYear() + 7)
      .required(),
    isGraduated: Joi.boolean(),
    isAdmin: Joi.boolean()
  });
  return schema.validate(user);
};