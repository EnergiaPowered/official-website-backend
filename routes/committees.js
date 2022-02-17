const express = require("express");
const router = express.Router();

const committeesController = require("../controllers/committesController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { checkSchema, validationResult } = require("express-validator");

// Defining a Checking Schema for the committee
const committeeCheckSchema = checkSchema({
  title: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  icon_class: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  mission: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  vision: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  jobDescription: {
    isArray: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
  },
});

// Retrieve all committees
router.get("/committees", committeesController.getAllCommittees);

// insert new committee w/ validation and sanitization
router.post(
  "/committees",
  [committeeCheckSchema],
  committeesController.postCommitte
);

// edit a committee w/ validation and sanitization
router.put(
  "/committees/:id",
  [committeeCheckSchema],
  committeesController.putCommitte
);

// delete a committee
router.delete("/committees/:id", committeesController.deleteOneCommitte);

// delete all committees
router.delete("/committees", committeesController.deleteAllCommittes);

module.exports = router;
