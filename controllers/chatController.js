const Event = require("../models/Event");
const Chat = require("../models/Chat");

module.exports = {
  getOneEvent: async (req, res) => {
    try {
      let event = await Event.findById(req.params.id);
      if (!event) {
        console.log("Not Found");
        return res.sendStatus(404);
      }
      let messages = await Chat.find({ EventId: req.params.id }).populate(
        "Event"
      );
      res.json(messages);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  postChat: async (req, res) => {
    try {
      const result = chatSchema.validate(req.body);
      if (result.error) {
        console.log(result.error.message);
        return res.sendStatus(400);
      }
      let event = await Event.findById(req.body.EventId);
      let user = await User.findById(req.user._id);
      if (!event || !User) {
        console.log("Not Found");
        return res.sendStatus(404);
      }
      let newChat = new Chat({
        userId: req.user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        comment: req.body.message,
        EventId: event._id,
      });

      newChat.save();
      res.json(newChat);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
