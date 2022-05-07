const express = require("express");
const router = express.Router();

const committeesController = require("../controllers/committesController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { checkSchema } = require("express-validator");

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
  image: {
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
/**
 * @api {get} /committees GET/ committees
 * @apiName GetAllCommittees
 * @apiGroup Committees Router
 *  @apiVersion 1.0.0
 * @apiSuccess {Object[]} Committees A list of all committee objects
 * @apiSampleRequest http://127.0.0.1:4000/api/committees
 * @apiSuccessExample Sample
 * [{"jobDescription":["Preparing the workshops’ material.","Making interviews with the coordination of HRs to select the participants.","Moderating sessions.","Organizing a semi-final and a final project for the participants."],"_id":"6024692102e88550d84ddf01","title":"Arduino & Embedded Systems","image":"<image link>","__v":0}]
 */
// Retrieve all committees
router.get("/committees", committeesController.getAllCommittees);

/**
 * @api {post} /committees POST/ committees
 * @apiName PostCommittee
 * @apiGroup Committees Router
 * @apiVersion 1.0.0
 * @apiBody {string} title title of the request body
 * @apiBody {string} icon_class icon_class of the request body
 * @apiBody {string[]} jobDescription jobDescription of the request body
 * @apiError (400) RequestEmptyError Request body was empty
 * @apiSampleRequest http://127.0.0.1:4000/api/committees
 *
 */
// insert new committee w/ validation and sanitization
router.post(
  "/committees",
  [committeeCheckSchema], auth, admin, 
  committeesController.postCommitte
);

/**
 * @api {put} /committees/:id PUT/ committees/:id
 * @apiName PutCommittee
 * @apiGroup Committees Router
 * @apiVersion 1.0.0
 * @apiError (400) RequestEmptyError Request body was empty
 * @apiError (404) CommitteeNotFound No committee with given id
 * @apiParam {string} id id of the committee
 * @apiSampleRequest http://127.0.0.1:4000/api/committees/72
 * @apiBody {string} title title of the request body
 * @apiBody {string} icon_class icon_class of the request body
 * @apiBody {string[]} jobDescription jobDescription of the request body
 *
 *
 */
// edit a committee w/ validation and sanitization
router.put(
  "/committees/:id",
  [committeeCheckSchema], auth, admin, 
  committeesController.putCommitte
);
/**
 * @api {delete} /committees/:id DELETE/ committees/:id
 * @apiName DeleteCommitteeById
 * @apiGroup Committees Router
 * @apiVersion 1.0.0
 * @apiError (401) AuthenticationError User is not authenticated
 * @apiError (403) AdministrationError User is not an administrator
 * @apiError (404) CommitteeNotFound No committee with given id
 * @apiSampleRequest http://127.0.0.1:4000/api/committees/70
 * @apiParam {number} id id of the committee
 */
// delete a committee
router.delete("/committees/:id", auth, admin, committeesController.deleteOneCommitte);
/**
 * @api {delete} /committees DELETE/ committees
 * @apiName DeleteAllCommittees
 * @apiGroup Committees Router
 * @apiVersion 1.0.0
 * @apiError (404) CommitteeNotFound No committees found
 * @apiSampleRequest http://127.0.0.1:4000/api/committees
 */
// delete all committees
router.delete("/committees", auth, admin, committeesController.deleteAllCommittes);

module.exports = router;
