const express = require("express");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");

const crewController = require("../controllers/crewController");
// Import authorization middleWares
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

/**
   * @api {get} /crew GET/ crew
   * @apiName GetAllCrew
   * @apiGroup Crew Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object[]} Crew A list of all member objects
   * @apiError (Error 404) CrewNotFound Error occures if there is no crew in the database
   * @apiError (Error 500) internalServerError Error occured during the process from the server 
   * @apiSampleRequest http://127.0.0.1:4000/api/crew
   * @apiSuccessExample crew:
   [
    {
        "isBest": false,
        "_id": "60271a41673d3e3e347a0b6b",
        "ID": 22,
        "name": "Essam Mostafa",
        "committee": "Arduino & Embedded Systems",
        "position": "Head",
        "imageID": "18lys9P31tVXIMI74ko-t2xEnn4y5aKkN",
        "__v": 0
    },
    {
        "isBest": false,
        "_id": "60271a41673d3e3e347a0b6f",
        "ID": 26,
        "name": "Sara Adel",
        "committee": "Arduino & Embedded Systems",
        "position": "Vice Head",
        "imageID": "1_PmfNfD-JqkccUE3niQsdE86WteIzuK-",
        "__v": 0
    },
    {
        "isBest": true,
        "_id": "60271a41673d3e3e347a0b89",
        "ID": 52,
        "name": "Rofayda Bassem",
        "committee": "Arduino & Embedded Systems",
        "position": "Member",
        "imageID": "1RHjB1Amf8jbajGWj2rP7-FElgih6UDV-",
        "__v": 0
    },
    {
        "isBest": false,
        "_id": "60271a41673d3e3e347a0b8a",
        "ID": 53,
        "name": "Bassem Metwali",
        "committee": "Arduino & Embedded Systems",
        "position": "Member",
        "imageID": "1NmJDQ3duN9TCEHec_xyJ590kfli9fvvU",
        "__v": 0
    },
]
*/
// Retrieve crew
router.get("/crew", crewController.getAllCrew);

/**
 * @api {post} /crew Post/ crew
 * @apiName postMember
 * @apiGroup crew Router
 * @apiVersion 1.0.0
 * @apiError (Error 400) valdiationError Something wrong with the body of the request
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiBody {String} name The name of the member
 * @apiBody {Number} ID The ID of the member
 * @apiBody {String} committee The committee which the member in
 * @apiBody {String} position The position of the member
 * @apiBody {Boolean} isBest The member is a best member or not
 * @apiBody {String} iamgeID The imagge id of the image of the member
 * @apiSampleRequest http://127.0.0.1:4000/api/crew/member
 * @apiSuccessExample sample:
 *ok
 */
// insert new member w/ validation and sanitization
router.post("/crew/member", [memberCheckSchema], crewController.postMember);

/**
 * @api {put} /crew/:id Put/ crew:id
 * @apiName putCrewMember
 * @apiGroup Crew Router
 * @apiVersion 1.0.0
 * @apiError (Error 400) valdiationError Something wrong with the body of the request
 * @apiError (Error 404) MemberNotFound No member with given id
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiBody {String} name The name of the member
 * @apiBody {Number} ID The id of the member
 * @apiBody {String} committee The committee which the member in
 * @apiBody {String} position The position of the member
 * @apiBody {Boolean} isBest The member is a best member or not
 * @apiBody {String} iamgeID The imagge id of the image of the member
 * @apiParam {Number} ID id of the member
 * @apiSampleRequest http://127.0.0.1:4000/api/crew
 * @apiSuccessExample sample:
 *ok
 */
// edit a member w/ validation and sanitization
router.put("/crew/:id", [memberCheckSchema], crewController.putOneCrew);

/**
 * @api {delete} /crew/:id DELETE/ crew/:id
 * @apiName DeleteMemberById
 * @apiGroup Crew Router
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiError (Error 404) MemberNotFound No member with given id
 * @apiParam {number} id id of the member
 * @apiSampleRequest http://127.0.0.1:4000/api/crew
 * @apiSuccessExample sample:
 *ok
 */
// delete a member
router.delete("/crew/:id", crewController.deleteOne);

/**
 * @api {delete} /crew DELETE/ crew
 * @apiName DeleteAllCrew
 * @apiGroup Crew Router
 * @apiError (Error 404) CrewNotFound Error occures if there is no crew in the database
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiSampleRequest http://127.0.0.1:4000/api/crew
 * @apiSuccessExample sample:
 *ok
 */
// delete all crew
router.delete("/crew", crewController.deleteAll);

module.exports = router;
