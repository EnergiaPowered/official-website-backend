const express = require("express");
const router = express.Router();
const Joi = require("joi");
const eventController = require("../controllers/eventController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Defining a Checking schema for the Event Body
const minDate = `1-1-${new Date(Date.now()).getFullYear() - 1}`;
const maxDate = `1-1-${new Date(Date.now()).getFullYear() + 1}`;

const eventsSchema = Joi.object({
  name: Joi.string().required(),

  startDate: Joi.date().greater(minDate),

  endDate: Joi.date().less(maxDate),

  category: Joi.string()
    .required()
    .valid("Session", "OnDayEvent", "Marathon", "Competition"),

  eventDescription: Joi.string().required(),

  eventMobileDescription: Joi.string().required(),

  eventDetails: Joi.string().allow(""),

  eventLocation: Joi.string().required(),

  eventImageID: Joi.string().allow(""),
});

// CRUD Operations routing of event
router.get("/events", eventController.getAllEvents);

router.get("/events/:id", eventController.getOneEvent);

router.post("/events", /*[auth, admin],*/ eventController.postEvent);

router.put("/events/:id", [auth, admin], eventController.putEvent);

router.delete("/events/:id", [auth, admin], eventController.deleteOneEvent);

router.delete("/events", /*[auth, admin],*/ eventController.deleteAllEvent);

module.exports = router;
