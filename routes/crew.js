const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

const crewController = require("../controllers/crewController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Defining a Checking Schema for the Member
const memberCheckSchema = checkSchema({
  ID: {
    isNumeric: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
  },
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
  committee: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  position: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  imageID: {
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

// Retrieve crew
router.get("/crew", crewController.getAllCrew);

// insert new member w/ validation and sanitization
router.post("/crew/member", [memberCheckSchema], crewController.postMember);

// edit a member w/ validation and sanitization
router.put("/crew/:id", [memberCheckSchema], crewController.putOneCrew);

// delete a member
router.delete("/crew/:id", crewController.deleteOne);

// delete all crew
router.delete("/crew", crewController.deleteAll);

module.exports = router;
