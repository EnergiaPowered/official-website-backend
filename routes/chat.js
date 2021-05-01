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
    userId: Joi.required(),
    EventId: Joi.required(),
    message: Joi.string()
      .required(),
  
  })
  
  router.get("/chat/:id", async (req, res) => {
    let event = await Event.findById(req.params.id);
    if(!event)
    {    
      console.log("Not Found");
      return res.sendStatus(404);
    }
    let messages = await Chat.find({EventId : req.params.id}).populate('Event');
    res.json(messages);
  
  });
  
  // Change when add auth you get the user id from it 
  router.post("/chat", auth ,async (req, res) => {
    const result = chatSchema.validate(req.body)
    if (result.error) {
      console.log(result.error.message);
      return res.sendStatus(400);
    }
    let event = await Event.findById(req.body.EventId);
    let user = await User.findById(req.user._id);
    if(!event || !User)
    {    
      console.log("Not Found");
      return res.sendStatus(404);
    }
    let newChat = new Chat({
        userId : req.user._id,
        username : user.firstname + " "+  user.lastname, 
        message : req.body.message,
        EventId : event._id
    });
  
    newChat.save();
    res.json(newChat);
    
  });

  function formatMessage(username, text) {
    return {
      username,
      text
    };
  }



exports.io = function(io) {
  // Run when client connects
io.on('connection', async socket => {

    const token = socket.handshake.headers["x-auth-token"];
    // handling authorization
    let user;
    socket.use((socket, next) => 
    {
        if (!token) {
          return next(new Error("unauthorized User"));
        };
        try {
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
            user = decoded;
            next();
          } catch (ex) {
            return next(new Error("unauthorized User"));
          }
    });
    // disconnect if auth failed
    socket.on("error", (err) => {
      if (err && err.message === "unauthorized User") {
        console.log(err.message);
        socket.disconnect();
      }
    });


    let valid_user = await User.findById(user._id);
    let name = valid_user.firstname + " "+  valid_user.lastname
    
    // join room 
  socket.on('joinRoom', async ( EventId ) => {
    // event room id from the url 
    let CurrentEvent = await Event.findById(EventId);
    if (!CurrentEvent) 
    {
      console.log("event not found");
      socket.disconnect();
    }
    socket.join(CurrentEvent.name);


    // Broadcast when a user connects
    socket.broadcast
      .to(CurrentEvent.name)
      .emit(
        'message',
        formatMessage(CurrentEvent.name, `${name} has joined the chat`)
      );

  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    io.to(CurrentEvent.name).emit('message', formatMessage(name, msg));
    
    // save the message in the database

    const options = 
    { 
      headers: {'x-auth-token': token} 
    };
    axios
    .post(`${process.env.HOST}/chat`, {
        EventId: CurrentEvent._id,
        message:msg
    },
    options)
    .then(res => {
      console.log(`statusCode: ${res.statusCode}`)
     console.log(res)
    })
    .catch(error => {
     console.error(error)
    })
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {

    if (user) {
      io.to(CurrentEvent.name).emit(
        'message',
        formatMessage(CurrentEvent.name, `${name} has left the chat`)
      );

    }
  });
});
};
exports.router = router;