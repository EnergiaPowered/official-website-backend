const express = require("express");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");

const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
// Defining a Checking Schema for the Message Body
const messageCheckSchema = checkSchema({
  name: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  email: {
    isEmail: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    normalizeEmail: true,
    escape: true,
  },
  message: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
});

// Receive messages from the user w/ validation and sanitization
router.get("/message", messageController.getAllMessages);

router.post("/message", messageCheckSchema, messageController.postMessage);

module.exports = router;
