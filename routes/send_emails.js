const { sendMultipleEmails } = require("../methods/mailer");
const router = require("express").Router();
// Import authorization middleWares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//Validate the emails
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

router.post("/send-emails", [auth, admin], async (req, res) => {
  try {
    let emails = req.body.emails;
    emails = emails.trim();
    let to = emails.split(" ");
    let subject = req.body.subject;
    let text = req.body.text;
    let from = req.body.from;
    for (let i = 0; i < to.length; i++) {
      if (!validateEmail(to[i])) throw new Error();
    }
    if (emails.indexOf(",") != -1 || !subject || !text || !from) {
      throw new Error();
    }
    await sendMultipleEmails(to, subject, text, from);
    res.status(200).json({ message: "Ok" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
