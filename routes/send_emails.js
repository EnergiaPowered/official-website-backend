const { sendMultipleEmails } = require("../methods/mailer");
const router = require("express").Router();
router.post("/send-emails", (req, res) => {
  let emails = req.body.emails;
  let to = emails.split(" ");
  let subject = req.body.subject;
  let text = req.body.text;
  let check = sendMultipleEmails(to, subject, text);
  if (check == 1) res.status(200).json({ message: "Ok" });
  else if (check == -1)
    res.status(500).json({ message: "Internal server error" });
});
module.exports = router;
