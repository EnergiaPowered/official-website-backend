const express = require("express");
const router = express.Router();
const Joi = require('joi');
const Event = require("../models/Event");
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

// Defining a Checking schema for the Event Body
const minDate = `1-1-${new Date(Date.now()).getFullYear() - 1}`;
const maxDate = `1-1-${new Date(Date.now()).getFullYear() + 1}`;

const eventsSchema = Joi.object({
  name: Joi.string()
    .required(),

  startDate: Joi.date()
    .greater(maxDate),

  endDate: Joi.date()
    .less(minDate),

  status: Joi.string()
    .required()
    .valid('Closed', 'Soon', 'Opened'),

  category: Joi.string()
    .required()
    .valid('Session', 'OnDayEvent', 'Marathon', 'Competition'),

  eventDescription: Joi.string()
    .required(),

  eventLocation: Joi.string()
    .required(),

  eventOrganizer: Joi.string()
    .required(),

  eventImageID: Joi.string()
    .allow("")
})

// CRUD Operations routing of event
router.get("/events", (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(500);
    }
    res.status(200).json(events);
  });
});

router.post("/events", /*[auth, admin],*/(req, res) => {
  const result = eventsSchema.validate(req.body)
  if (result.error) {
    console.log(result.error.message);
    return res.sendStatus(400);
  }
  let newEvent = new Event(req.body);
  newEvent.save();
  res.sendStatus(200);
});

router.put("/events/:id", [auth, admin], (req, res) => {
  result = eventsSchema.validate(req.body)
  if (result.error) {
    console.log(result.error.message);
    return res.sendStatus(400);
  }

  try {
    Event.findByIdAndUpdate({ _id: req.params.id },
      {
        $set: req.body
      })
      .then((event) => {
        res.send(event);
      });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.delete("/events/:id", [auth, admin], (req, res) => {
  try {
    Event.findByIdAndRemove(req.params.id, (err, event) => {
      if (err) throw err;
      if (event == null)
        return res.sendStatus(404);
      res.sendStatus(200);
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.delete("/events", /*[auth, admin],*/(req, res) => {
  try {
    Event.deleteMany({}, (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;