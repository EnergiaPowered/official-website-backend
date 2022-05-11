const express = require("express");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");

const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
// Defining a Checking Schema for the Message Body
const messageCheckSchema = checkSchema({
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
  email: {
    isEmail: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    normalizeEmail: true,
    escape: true,
  },
  message: {
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
   * @api {get} /message GET/ message
   * @apiName GetMessage
   * @apiGroup Message Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object} Message Get the messages sent to the server by the users
   * @apiError (Error 500) internalServerError Error occured during the process from the server
   * @apiSampleRequest http://127.0.0.1:4000/api/message
   * @apiSuccessExample messages:
   *[
    {
        "_id": "5e83241003696d42e4371771",
        "name": "sdf",
        "email": "sdf@sf.sd",
        "message": "sdflj",
        "__v": 0
    },
    {
        "_id": "5e8342b903696d42e4371772",
        "name": "eee",
        "email": "eee@gmail.com",
        "message": "hhhhhhhhhh",
        "__v": 0
    },
    {
        "_id": "5f99bb4601d06e3e74f2a81f",
        "name": "Abdullah",
        "email": "abdullahadelaam@gmail.com",
        "message": "Hello World!",
        "__v": 0
    },
    {
        "_id": "5fb7590518b26622f4ff866e",
        "name": "mostafa",
        "email": "mostafa_kamal@gmail.com",
        "message": "asdsadasdasdas d asdasd ad a das da",
        "__v": 0
    },
    {
        "_id": "608100256451870015c22bd4",
        "name": "Mohammed Abdellatif",
        "email": "salama.mody@yahoo.com",
        "message": "test",
        "__v": 0
    },
    {
        "_id": "6091e019f8f4d60874115a99",
        "name": "Abdullah",
        "email": "abdullahadelaam@gmail.com",
        "message": "Hello there I am Abdullah Adel an Energian!",
        "__v": 0
    },
    {
        "_id": "6091e10ef8f4d60874115a9a",
        "name": "Abdullah Adel",
        "email": "abdullahadelaam@gmail.com",
        "message": "Hey there!",
        "__v": 0
    },
    {
        "_id": "6091e19af8f4d60874115a9b",
        "name": "Abdullah Adel Abdullah Abdulghani",
        "email": "abdullahalshawafi2@gmail.com",
        "message": "asdfasdfasdf",
        "__v": 0
    }
]
*/
// Receive messages from the user w/ validation and sanitization
router.get("/message", messageController.getAllMessages);

/**
 * @api {post} /message POST/ message
 * @apiName PostMessage
 * @apiGroup Message Router
 * @apiVersion 1.0.0
 * @apiSuccess {String} ok
 * @apiError (Error 400) valdiationError Something wrong with the body of the request
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiBody {String} name The name of the user who sent the message
 * @apiBody {String} email The email of the user who sent the message
 * @apiBody {String} message The message of the user
 * @apiSampleRequest http://127.0.0.1:4000/api/message
 * @apiSuccessExample sample:
 *ok
 */

router.post("/message", auth, messageCheckSchema, messageController.postMessage);

module.exports = router;
