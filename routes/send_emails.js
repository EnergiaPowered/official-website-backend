const { sendMultipleEmails } = require("../methods/mailer");
const router = require("express").Router();
router.post("/send-emails", (req, res) => {
  let emails = req.body.emails;
  let to = emails.split(" ");
  let subject = req.body.subject;
  let text = req.body.text;
  sendMultipleEmails(to, subject, text);
  res.status(200).json({ message: "Ok" });
});
module.exports = router;
