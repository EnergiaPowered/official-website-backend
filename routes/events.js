const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/**
   * @api {get} /events GET/ events
   * @apiName GetAllEvents
   * @apiGroup Events Router
   * @apiSuccess {Object[]} Events A list of all event objects
   * @apiSuccessExample events:
   * [
  {
    name: "Dummy Text",
    startDate: "Dummy Date",
    endDate: "Dummy Date",
    status: "Dummy Text",
    category: "Dummy Date",
    eventDescription: "Dummy Date",
	eventMobileDescription: "Dummy Date",
    eventDetails: "Dummy Date",
    eventLocation: "Dummy Date",
    eventImageID: "Dummy Text",
    _id: "90",
  },
  {
    name: "Dummy Text",
    startDate: "Dummy Date",
    endDate: "Dummy Date",
    status: "Dummy Text",
    category: "Dummy Date",
    eventDescription: "Dummy Date",
    eventMobileDescription: "Dummy Date",
    eventDetails: "Dummy Date",
    eventLocation: "Dummy Date",
    eventImageID: "Dummy Text",
    _id: "91",
  },
];
   *  @apiSampleRequest http://127.0.0.1:4000/events
   */
// CRUD Operations routing of event
router.get("/events", eventController.getAllEvents);

/**
   * @api {get} /events/:id GET/ events/:id
   * @apiName GetEventById
   * @apiGroup Events Router
   * @apiParam {Number} id Event id
   * @apiSuccess {Object} event Returns event with given id
   * @apiSuccessExample event response:
   * {
    name: "Dummy Text",
    startDate: "Dummy Date",
    endDate: "Dummy Date",
    status: "Dummy Text",
    category: "Dummy Date",
    eventDescription: "Dummy Date",
    eventMobileDescription: "Dummy Date",
    eventDetails: "Dummy Date",
    eventLocation: "Dummy Date",
    eventImageID: "Dummy Text",
    _id: "91"
}
   * @apiSampleRequest http://127.0.0.1:4000/events/90
   */

router.get("/events/:id", eventController.getOneEvent);
/**
 * @api {post} /events POST/ events
 * @apiName PostEvent
 * @apiGroup Events Router
 * @apiError (400) RequestEmptyError Request body was empty
 * @apiError (500) err Error in saving event
 * @apiBody {string} name name of the event
 * @apiBody {Date} startDate start date of the event
 * @apiBody {Date} endDate end date of the event
 * @apiBody {string} status status of the event
 * @apiBody {string} category category of the event
 * @apiBody {string} eventDescription description of the event
 * @apiBody {string} eventDetails details of the event
 * @apiBody {string} eventLocation location of the event
 * @apiBody {string} eventImageID image id of the event
 * @apiSampleRequest http://127.0.0.1:4000/events
 */
router.post("/events", [auth, admin], eventController.postEvent);

/**
 * @api {put} /events/:id PUT/ events/:id
 * @apiName PutEvent
 * @apiGroup Events Router
 * @apiError (400) RequestEmptyError Request body was empty
 * @apiError (404) EventNotFound No event with given id
 * @apiParam {number} id id of the event
 * @apiSampleRequest http://127.0.0.1:4000/events/91
 */
router.put("/events/:id", [auth, admin], eventController.putEvent);
/**
 * @api {delete} /events/:id DELETE/ events/:id
 * @apiName DeleteEventById
 * @apiGroup Events Router
 * @apiError (401) AuthenticationError User is not authenticated
 * @apiError (403) AdministrationError User is not an administrator
 * @apiError (404) EventNotFound No event with given id
 * @apiParam {number} id id of the event
 * @apiSampleRequest http://127.0.0.1:4000/events/90
 */
router.delete("/events/:id", [auth, admin], eventController.deleteOneEvent);
/**
 * @api {delete} /events DELETE/ events
 * @apiName DeleteAllEvents
 * @apiGroup Events Router
 * @apiError (404) EventNotFound no events
 * @apiSampleRequest http://127.0.0.1:4000/events
 */
router.delete("/events", [auth, admin], eventController.deleteAllEvent);

module.exports = router;
