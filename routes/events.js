const express = require("express");
const router = express.Router();
const Joi = require("joi");
const eventController = require("../controllers/eventController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// CRUD Operations routing of event
router.get("/events", eventController.getAllEvents);

router.get("/events/:id", eventController.getOneEvent);

router.post("/events", [auth, admin], eventController.postEvent);

router.put("/events/:id", [auth, admin], eventController.putEvent);

router.delete("/events/:id", [auth, admin], eventController.deleteOneEvent);

router.delete("/events", [auth, admin], eventController.deleteAllEvent);

module.exports = router;
