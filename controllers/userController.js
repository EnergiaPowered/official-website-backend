const { User, validate } = require("../models/User");
const passwordComplexity = require("joi-password-complexity");
const mailer = require("../methods/mailer").sendOneEmail;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const _ = require("lodash");
const Joi = require("joi");

function validate_update(user) {
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
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(7).max(15).required(),
    password: passwordComplexity(passwordValidations),
    confirm_password: passwordComplexity(passwordValidations),
    university: Joi.string().min(2).max(100).required(),
    faculty: Joi.string().min(2).max(100).required(),
    department: Joi.string().min(2).max(100).allow(""),
    graduationYear: Joi.number()
      .min(new Date(Date.now()).getFullYear() - 7)
      .max(new Date(Date.now()).getFullYear() + 7)
      .required(),
    isGraduated: Joi.boolean(),
  });
  return schema.validate(user);
}

module.exports = {
  getTheSignedInUser: async (req, res) => {
    const user = await User.findById(req.user._id).select(
      "-password -__v -_id"
    );
    if (!res.body) {
      return res.status(404).json({ message: "Can't find user" });
    }
    res.send(user);
  },
  postOneUser: async (req, res) => {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send({ message: "Email is already taken." });

    if (req.body.password !== req.body.confirm_password)
      return res.status(400).send({ message: "Passwords don't match." });

    user = new User({
      ..._.pick(req.body, [
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
      isAdmin: false,
    });

    // hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // Send the message to the user with the token
    const token = user.generateAuthToken();
    // Key to encrypt and decrypt the token
    let mykey = crypto.createCipheriv(
      "aes-128-cbc",
      process.env.CIPHER_PASSWORD,
      process.env.INIT_VECTOR
    );
    // encrypt the token using aes algorithm and Private-Key
    let encrypted_token = mykey.update(token, "utf8", "hex");
    encrypted_token += mykey.final("hex");

    const link = process.env.HOST + "/api/verify?id=" + encrypted_token;

    mailer(
      user.email,
      link,
      user.firstname,
      "Email Verification from Energia Powered",
      "./assets/verify.html"
    );

    res.status(200).send({
      message:
        "You have registered successfully. Please check your email for verification.",
    });
  },
  putSignedUser: async (req, res) => {
    try {
      const { error } = validate_update(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      // get id of the user from his JWT Token
      let user = await User.findById(req.user._id);
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;

      if (req.body.password) {
        user.password = req.body.password;
        // hashing password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }

      await user.save();
      // return response the token and user properties
      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "firstname", "lastname", "email"]));
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  },
  deleteUser: async (req, res) => {
    try {
      User.findByIdAndRemove(req.user._id, (err, user) => {
        if (err) throw err;
        if (user == null) return res.sendStatus(404);

        return res.send(user.name + " has been Deleted");
      });
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  },
  getAllUsers: (req, res) => {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json({ message: err }));
  },
};
