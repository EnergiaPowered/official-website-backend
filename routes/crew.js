const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

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
   * @apiSuccess {Object} Crew An object where each key is a committee and each value is a list of committee member objects
   * @apiError (Error 404) CrewNotFound Error occures if there is no crew in the database
   * @apiError (Error 500) internalServerError Error occured during the process from the server 
   * @apiSampleRequest http://127.0.0.1:4000/api/crew
   * @apiSuccessExample crew:
   {
    "Arduino & Embedded Systems": [
        {
            "isBest": true,
            "_id": "60271a41673d3e3e347a0b8c",
            "ID": 55,
            "name": "Mohamed Haroon",
            "committee": "Arduino & Embedded Systems",
            "position": "Member",
            "imageID": "1HTom-HUcVoAz95Op3QayAe7d3lxo_Jc7",
            "__v": 0
        },
        {
            "isBest": false,
            "_id": "62110cd2c51126074817c7c3",
            "ID": 56,
            "name": "Saleh Zakaria",
            "committee": "Arduino & Embedded Systems",
            "position": "Member",
            "imageID": "1iS8JsSD1rdftCbZGcKrMOeRsQLy8z3bj",
            "__v": 0
        }
    ],
    "C++": [
        {
            "isBest": false,
            "_id": "60271a41673d3e3e347a0b6c",
            "ID": 23,
            "name": "Shaimaa Osama",
            "committee": "C++",
            "position": "Head",
            "imageID": "1GeRbEsqVylxyeuZhxVU4EMtKLlI4ju1J",
            "__v": 0
        },
        {
            "isBest": true,
            "_id": "60271a41673d3e3e347a0b8e",
            "ID": 57,
            "name": "Ahmed Wael",
            "committee": "C++",
            "position": "Member",
            "imageID": "1fhFSpPS_f_oSeYZfneDtagDaL0YouKB2",
            "__v": 0
        },
        {
            "isBest": false,
            "_id": "60271a41673d3e3e347a0b8f",
            "ID": 58,
            "name": "Hamza Harby",
            "committee": "C++",
            "position": "Member",
            "imageID": "1AYpYQ7oKjHBglp_EGjwAEaWgLtQPRIIA",
            "__v": 0
        },
        {
            "isBest": false,
            "_id": "60271a41673d3e3e347a0b90",
            "ID": 59,
            "name": "Mahmoud Tarek",
            "committee": "C++",
            "position": "Member",
            "imageID": "1ooiFlGFOowzvdIAIjccZL-2ocKZ_xW9L",
            "__v": 0
        },
        {
            "isBest": true,
            "_id": "60271a41673d3e3e347a0b91",
            "ID": 60,
            "name": "Mariam Ashraf",
            "committee": "C++",
            "position": "Member",
            "imageID": "1qo6-ZybOP1ahBDBi67WTvCrLh2UgmQKh",
            "__v": 0
        },
        {
            "isBest": false,
            "_id": "60271a41673d3e3e347a0b92",
            "ID": 61,
            "name": "Mohamed Yahia",
            "committee": "C++",
            "position": "Member",
            "imageID": "1rgyr8kkEyO85dFG582Km0mFELDil0-nW",
            "__v": 0
        },
        {
            "isBest": true,
            "_id": "60271a41673d3e3e347a0b93",
            "ID": 62,
            "name": "Mohamed Zahran",
            "committee": "C++",
            "position": "Member",
            "imageID": "1UAT9mtqe_ncNRCd2dOMsRc9pobnCw6SR",
            "__v": 0
        }
    ]
  }
*/
// Retrieve crew
router.get("/crew", crewController.getAllCrew);

/**
   * @api {get} /crew/:id GET/ crew/:id
   * @apiName GetMember
   * @apiGroup Crew Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object} Member Member object
   * @apiError (Error 404) MemberNotFound Error occurs if there is no crew in the database
   * @apiError (Error 500) internalServerError Error occurred during the process from the server 
   * @apiSampleRequest http://127.0.0.1:4000/api/crew/22
   * @apiSuccessExample crew:
    {
        "isBest": false,
        "_id": "60271a41673d3e3e347a0b6b",
        "ID": 22,
        "name": "Essam Mostafa",
        "committee": "Arduino & Embedded Systems",
        "position": "Head",
        "imageID": "18lys9P31tVXIMI74ko-t2xEnn4y5aKkN",
        "__v": 0
    }
*/
router.get("/crew/:id", crewController.getMember);

/**
 * @api {post} /crew Post/ crew
 * @apiName postMember
 * @apiGroup Crew Router
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
