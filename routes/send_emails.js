const { sendMultipleEmails } = require("../methods/mailer");
const router = require("express").Router();
// Import authorization middleWares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/send-emails", [auth, admin], async (req, res) => {
  try {
    let emails = req.body.emails;
    let to = emails.split(" ");
    let subject = req.body.subject;
    let text = req.body.text;
    let from = req.body.from;
    await sendMultipleEmails(to, subject, text, from);
    res.status(200).json({ message: "Ok" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
