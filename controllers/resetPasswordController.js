const { User } = require("../models/User");
const crypto = require("crypto");
const mailer = require("../methods/mailer");
const jwt = require("jsonwebtoken");
const expire = require("../methods/expire");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

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

module.exports = {
  postForgetPassword: async (req, res) => {
    let email = req.body.email;
    let user_agent = req.headers["user-agent"];
    console.log(user_agent);
    // check if the email exist in the database
    user = await User.findOne({ email: email });
    if (!user) res.status(404).send("invalid Email");
    try {
      token = user.generateAuthToken();
      // encrypt the token using aes algorithm and Private-Key
      let mykey = crypto.createCipheriv(
        "aes-128-cbc",
        process.env.CIPHER_PASSWORD,
        process.env.INIT_VECTOR
      );
      let encrypted_token = mykey.update(token, "utf8", "hex");
      encrypted_token += mykey.final("hex");
      link = process.env.FRONT_HOST + "/reset-password?id=" + encrypted_token;
      // send the email
      mailer(
        user.email,
        link,
        user.firstname,
        "Reset Password Request For EnergiaPowered",
        "./assets/reset.html",
        user_agent
      );
      res.status(200).send("Reset Password email is sent successfully");
    } catch (err) {
      res.status(500).send("Error While Sending The reset Password" + err);
    }
  },
  postResetPassword: async (req, res) => {
    // validate password
    const { error } = validate_password(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let token = req.query.id;
    let password = req.body.password;
    try {
      let mykey = crypto.createDecipheriv(
        "aes-128-cbc",
        process.env.CIPHER_PASSWORD,
        process.env.INIT_VECTOR
      );
      let decrypted_token = mykey.update(token, "hex", "utf8");
      decrypted_token += mykey.final("utf8");
      const decoded = jwt.verify(decrypted_token, process.env.PRIVATE_KEY);
      // check the token is expired
      let tokenTime = decoded.iat * 1000;
      if (expire(tokenTime, 24)) {
        res.status(400).send("This token is expired");
      }
      // find the user
      let user = await User.findById(decoded["_id"]);
      user.password = password;
      // hashing password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      res.status(200).send("Reset Password Success");
    } catch (err) {
      res.status(500).send("Error while reset password" + err);
    }
  },
};
