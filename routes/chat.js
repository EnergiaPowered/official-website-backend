const express = require("express");
const router = express.Router();
const { User, validate } = require('../models/User');
const Joi = require('joi');
const Event = require("../models/Event");
const Chat = require("../models/Chat");
const auth = require("../middleware/auth")
const jwt = require("jsonwebtoken");
const axios = require('axios');

// chat get and add by know the event id 
const chatSchema = Joi.object({
  EventId: Joi.required(),
  message: Joi.string()
    .required(),
});

router.get("/events/:id/chat", auth, async (req, res) => {
  let event = await Event.findById(req.params.id);
  if (!event) {
    console.log("Not Found");
    return res.sendStatus(404);
  }
  let messages = await Chat.find({ EventId: req.params.id }).populate('Event');
  res.json(messages);
});

// Change when add auth you get the user id from it 
router.post("/chat", auth, async (req, res) => {
  const result = chatSchema.validate(req.body)
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
    EventId: event._id
  });

  newChat.save();
  res.json(newChat);

});

function formatMessage(userId, firstname, lastname, comment) {
  return { userId, firstname, lastname, comment };
}

exports.io = function (io) {
  // Run when client connects
  io.on('connection', async socket => {

    const token = socket.handshake.headers["x-auth-token"];
    // handling authorization
    let user;
    if (!token) {
      socket.disconnect();
      return;
    };
    try {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      user = decoded;
    } catch (error) {
      socket.disconnect();
      return;
    }

    let valid_user = await User.findById(user._id);
    let firstname = valid_user.firstname;
    let lastname = valid_user.lastname;

    // join room 
    let RoomId;
    socket.on('joinRoom', async (EventId) => {
      // event room id from the url 
      console.log(EventId)
      RoomId = EventId;
      let CurrentEvent = await Event.findById(EventId);
      if (!CurrentEvent) {
        console.log("event not found");
        socket.disconnect();
        return;
      }
      socket.join(RoomId);
      // Emit when a user connects
      io.to(RoomId).emit('message', formatMessage("", "Streaming", "Event", `${firstname} has joined the chat`));
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      io.to(RoomId).emit('message', formatMessage(user._id, firstname, lastname, msg));

      // save the message in the database
      const options = { headers: { 'x-auth-token': token } };

      axios
        .post(`${process.env.HOST}/chat`, {
          EventId: RoomId,
          message: msg
        }, options)
        .then(res => {
          console.log(`statusCode: ${res.statusCode}`)
        })
        .catch(error => {
          console.error("Error: message not stored correctly");
        })
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
      if (user) {
        io.to(RoomId).emit('message', formatMessage("", "Streaming", "Event", `${firstname} has left the chat`));
      }
    });
  });
};

exports.router = router;