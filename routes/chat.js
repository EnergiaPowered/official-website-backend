const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/User");
const chatController = require("../controllers/chatController");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Event = require("../models/Event");

router.get("/events/:id/chat", auth, chatController.getOneEvent);

// Change when add auth you get the user id from it
router.post("/chat", auth, chatController.postChat);

function formatMessage(userId, firstname, lastname, comment) {
  return { userId, firstname, lastname, comment };
}

exports.io = function (io) {
  let startedStreams = {};
  // Run when client connects
  io.on("connection", async (socket) => {
    // handling authorization
    const token = socket.handshake.headers["x-auth-token"];
    let user;
    if (!token) {
      socket.disconnect();
      return;
    }

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
    socket.on("joinRoom", async (EventId) => {
      // event room id from the url
      console.log(EventId);
      RoomId = EventId;
      let CurrentEvent = await Event.findById(EventId);
      if (!CurrentEvent) {
        console.log("event not found");
        socket.disconnect();
        return;
      }
      socket.join(RoomId);
      // Emit when a user connects
      socket.broadcast
        .to(RoomId)
        .emit(
          "message",
          formatMessage(
            "",
            firstname,
            lastname,
            `${firstname} has joined the chat`
          )
        );

      startedStreams[RoomId] && io.to(RoomId).emit("start-streaming");
    });

    socket.on("start-streaming", () => {
      startedStreams[RoomId] = true;
      console.log(startedStreams);
      socket.broadcast.to(RoomId).emit("start-streaming");
    });

    socket.on("stop-streaming", () => {
      console.log("stop streaming");
      delete startedStreams[RoomId];
      socket.broadcast.to(RoomId).emit("stop-streaming");
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
      io.to(RoomId).emit(
        "message",
        formatMessage(user._id, firstname, lastname, msg)
      );

      // save the message in the database
      const options = { headers: { "x-auth-token": token } };

      axios
        .post(
          `${process.env.HOST}/api/chat`,
          {
            EventId: RoomId,
            message: msg,
          },
          options
        )
        .then((res) => {
          console.log(`comment: ${res.data.comment}`);
        })
        .catch((error) => {
          console.error("Error: message not stored correctly");
        });
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      if (user) {
        socket.broadcast
          .to(RoomId)
          .emit(
            "message",
            formatMessage(
              "",
              firstname,
              lastname,
              `${firstname} has left the chat`
            )
          );
      }
    });
  });
};

exports.router = router;
