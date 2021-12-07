const Event = require("../models/Event");
const Joi = require("joi");

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

module.exports = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find({}).lean().sort({ startDate: -1 });
      const currentDate = new Date();
      events.forEach((event) => {
        if (currentDate >= event.startDate && currentDate <= event.endDate)
          event.status = "Opened";
        else if (currentDate < event.startDate) event.status = "Soon";
        else if (currentDate > event.endDate) event.status = "Closed";
      });
      let sortedEvents = [];
      ["Opened", "Soon", "Closed"].forEach((status) => {
        events.forEach((event) => {
          if (event.status === status) {
            sortedEvents.push(event);
          }
        });
      });
      res.status(200).json(sortedEvents);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  getOneEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.sendStatus(404);
      }
      res.json(event);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  postEvent: (req, res) => {
    const result = eventsSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.sendStatus(400);
    }
    let newEvent = new Event(req.body);
    newEvent
      .save()
      .then((event) => {
        res.json(event);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  putEvent: (req, res) => {
    result = eventsSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.sendStatus(400);
    }

    try {
      Event.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: req.body,
        }
      ).then((event) => {
        res.send(event);
      });
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  },
  deleteOneEvent: (req, res) => {
    try {
      Event.findByIdAndRemove(req.params.id, (err, event) => {
        if (err) throw err;
        if (event == null) return res.sendStatus(404);
        res.sendStatus(200);
      });
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  },
  deleteAllEvent: (req, res) => {
    try {
      Event.deleteMany({}, (err) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  },
};
