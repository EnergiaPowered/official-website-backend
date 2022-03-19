// use nodemailer to sent the email
let nodemailer = require("nodemailer");
// handlebars simple template to put the link in the html
let handlebars = require("handlebars");
let fs = require("fs");

// create transporter for gmail with the email and password
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

function sendMailer(to, link, username, subject, body, User_agent = "") {
  // read the Html file where it will sent to the email
  let emailTemplate = new Promise(function (resolve, reject) {
    fs.readFile(body, { encoding: "utf-8" }, function (err, html) {
      resolve(html);
      reject(err);
    });
  });

  // get the html where I read before
  emailTemplate
    .then(async (html) => {
      // use handlbars to compile html and put the dynamic data (token) into the html
      let template = handlebars.compile(html);
      let replacements = {
        link: link,
        username: username,
        User_agent: User_agent,
      };
      let htmlToSend = template(replacements);

      // create the message content
      let message = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: htmlToSend,
      };
      // await the transporter to send the email containig the message
      try {
        let info = await transporter.sendMail(message);
        console.log(info.messageId);
      } catch (err) {
        console.log("Error While Sending the Email\n" + err);
      }
    })
    .catch((err) => console.log("Error While Sending the Email\n" + err));
}

//Send multiple emails
async function sendMultipleMailer(to, subject, text, from) {
  if (!from) from = "Energia Powered";
  // create the message content
  let message = {
    from: `${from}<${process.env.EMAIL}> `,
    to: to,
    subject: subject,
    text: text,
  };
  // await the transporter to send the email containig the message
  try {
    let info = await transporter.sendMail(message);
  } catch (err) {
    throw new Error();
  }
}
module.exports = {
  sendOneEmail: sendMailer,
  sendMultipleEmails: sendMultipleMailer,
};
