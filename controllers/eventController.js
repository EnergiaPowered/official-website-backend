const Event = require("../models/Event");

module.exports = {
  getAllEvents: (req, res) => {
    Event.find({})
      .lean()
      .sort({ startDate: -1 })
      .exec((err, events) => {
        if (err) {
          console.log(err.message);
          return res.sendStatus(500);
        }
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
      });
  },

  getOneEvent: (req, res) => {
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