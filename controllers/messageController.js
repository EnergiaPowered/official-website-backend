// Importing Model
const Message = require("../models/Message");

module.exports = {
  getAllMessages: (req, res) => {
    Message.find({}, (err, messages) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.status(200).json(messages);
    });
  },
  postMessage: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        validationResult(req).throw();
        let newMessage = new Message(req.body);
        newMessage.save((err, mess) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          res.sendStatus(200);
        });
      } else res.sendStatus(400);
    } catch (err) {
      res.status(400).send(err.mapped());
    }
  },
};
