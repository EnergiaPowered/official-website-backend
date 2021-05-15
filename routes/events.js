const express = require("express");
const router = express.Router();
const Joi = require('joi');
const Event = require("../models/Event");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Defining a Checking schema for the Event Body
const minDate = `1-1-${new Date(Date.now()).getFullYear() - 1}`;
const maxDate = `1-1-${new Date(Date.now()).getFullYear() + 1}`;

const eventsSchema = Joi.object({
  name: Joi.string()
    .required(),

  startDate: Joi.date()
    .greater(minDate),

  endDate: Joi.date()
    .less(maxDate),

  category: Joi.string()
    .required()
    .valid('Session', 'OnDayEvent', 'Marathon', 'Competition'),

  eventDescription: Joi.string()
    .required(),

  eventMobileDescription: Joi.string()
    .required(),

  eventDetails: Joi.string()
    .allow(""),

  eventLocation: Joi.string()
    .required(),

  eventImageID: Joi.string()
    .allow("")
})

// CRUD Operations routing of event
router.get("/events", (req, res) => {
  Event.find({}).lean().sort({ startDate: -1 }).exec((err, events) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(500);
    }
    const currentDate = new Date();
    events.forEach(event => {
      if (currentDate >= event.startDate && currentDate <= event.endDate) event.status = "Opened";
      else if (currentDate < event.startDate) event.status = "Soon";
      else if (currentDate > event.endDate) event.status = "Closed";
    });
    let sortedEvents = [];
    ["Opened", "Soon", "Closed"].forEach(status => {
      events.forEach(event => {
        if (event.status === status) {
          sortedEvents.push(event);
        }
      })
    });
    res.status(200).json(sortedEvents);
  });
});

router.get("/events/:id", (req, res) => {
  Event.findById(req.params.id).exec((err, event) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(500);
    }
    if (!event) {
      return res.sendStatus(404);
    }
    res.json(event);
  });
});

router.post("/events", /*[auth, admin],*/(req, res) => {
  const result = eventsSchema.validate(req.body)
  if (result.error) {
    console.log(result.error.message);
    return res.sendStatus(400);
  }
  let newEvent = new Event(req.body);
  newEvent.save().then(event => {
    res.json(event);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
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