const { User, validate } = require("../models/User");
const expire = require("../methods/expire");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mailer = require("../methods/mailer");
const crypto = require("crypto");

/**
   * @api {get} /verify GET/ verify
   * @apiName Getverify
   * @apiGroup verify Router
   * @apiVersion 1.0.0
   * @apiSuccess {string} User Get the message that it's username are verifyed
   * @apiError (Error 404) UserNotFound Error occures if the user was deleted from the database
   * @apiError (Error 400) Unauthorized Error occures if there were no user
   * @apiSampleRequest http://127.0.0.1:4000/api/verify
   
*/

router.get("/verify", async (req, res) => {
  const token = req.query["id"];
  // Key to encrypt and decrypt the token
  let mykey = crypto.createDecipheriv(
    "aes-128-cbc",
    process.env.CIPHER_PASSWORD,
    process.env.INIT_VECTOR
  );
  try {
    let decrypted_token = mykey.update(token, "hex", "utf8");
    decrypted_token += mykey.final("utf8");

    const decoded = jwt.verify(decrypted_token, process.env.PRIVATE_KEY);
    try {
      // find the user
      let user = await User.findById(decoded["_id"]);
      // check if the user is already verified
      if (user.verified) {
        res
          .status(200)
          .send(user.firstname + " " + user.lastname + " is already verified");
      } else {
        // check the token is expired
        let tokenTime = decoded.iat * 1000;
        if (expire(tokenTime, 2)) {
          res
            .status(400)
            .send("The link is expired. We are sending you a new email.");

          // Send the message to the user with the token
          // Key to encrypt and decrypt the token
          let mykey = crypto.createDecipheriv(
            "aes-128-cbc",
            process.env.CIPHER_PASSWORD,
            process.env.INIT_VECTOR
          );
          let encrypted_token = mykey.update(token, "utf8", "hex");
          encrypted_token += mykey.final("hex");

          const link = process.env.HOST + "/verify?id=" + encrypted_token;
          mailer(
            user.email,
            link,
            user.firstname,
            "Email Verfication from Energia Powered",
            "./assets/verify.html"
          );
        } else {
          user.verified = true;
          await user.save();
          res
            .status(200)
            .cookie("verfied", "true", { maxAge: 60000 })
            .redirect(process.env.FRONT_HOST + "/");
          // res.status(200).send("Email verified! Please log in.");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid token.");
  }
});

module.exports = router;
