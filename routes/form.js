const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
// Import authorization middleWares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/**
   * @api {get} /form GET/ form
   * @apiName GetAllForms
   * @apiGroup Form Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object[]} Form A list of all form objects
   * @apiError (Error 404) FormsNotFound Error occures if the forms were deleted from the database
   * @apiError (Error 500) internalServerError Error occured during the process from the server
   * @apiSampleRequest http://127.0.0.1:4000/api/form
   * @apiSuccessExample forms:
   * [
    {
        "postSubmit": "message to show after submission",
        "preform": "message to show before the form starts ",
        "postform": "hjadshfjkad",
        "_id": "61ad489f7adeeb2dd472de07",
        "title": "workshop part",
        "description": "description",
        "startDate": "2021-11-30T23:17:46.068Z",
        "endDate": "2021-12-30T23:17:48.094Z",
        "fields": [
            {
                "type": "Text",
                "_id": "61ad489f7adeeb2dd472de08",
                "label": "fullname",
                "isRequired": false,
                "placeholder": "insert fullname",
                "options": []
            },
            {
                "type": "Selection",
                "_id": "61ad489f7adeeb2dd472de09",
                "label": "wanna join us",
                "isRequired": true,
                "options": [
                    {
                        "_id": "61ad489f7adeeb2dd472de0a",
                        "value": "yes",
                        "label": "yes"
                    },
                    {
                        "_id": "61ad489f7adeeb2dd472de0b",
                        "value": "no",
                        "label": "no"
                    }
                ]
            }
        ],
        "createdAt": "2021-12-05T23:17:51.032Z",
        "updatedAt": "2021-12-05T23:17:51.032Z",
        "__v": 0
    },
    {
        "postSubmit": "message to show after submission",
        "preform": "message to show before form start",
        "postform": "message to show after the form ends",
        "_id": "61ad45dd7adeeb2dd472de01",
        "title": "form title",
        "description": "form description",
        "startDate": "2021-11-30T22:53:35.643Z",
        "endDate": "2021-12-30T22:53:38.320Z",
        "fields": [
            {
                "type": "Text",
                "_id": "61ad45dd7adeeb2dd472de02",
                "label": "fullname",
                "isRequired": true,
                "placeholder": "insert ur fullname",
                "options": []
            },
            {
                "type": "TextArea",
                "_id": "61ad45dd7adeeb2dd472de03",
                "label": "suggestions",
                "isRequired": false,
                "placeholder": "some suggestion...",
                "options": []
            },
            {
                "type": "Selection",
                "_id": "61ad45dd7adeeb2dd472de04",
                "label": "wanna join us !?",
                "isRequired": true,
                "options": [
                    {
                        "_id": "61ad45dd7adeeb2dd472de05",
                        "value": "yes ",
                        "label": "yes "
                    },
                    {
                        "_id": "61ad45dd7adeeb2dd472de06",
                        "value": "no",
                        "label": "no"
                    }
                ]
            }
        ],
        "createdAt": "2021-12-05T23:06:05.414Z",
        "updatedAt": "2021-12-05T23:06:05.414Z",
        "__v": 0
    },
]
   */
//get all the forms in the db
router.get("/form", formController.getForms);

/**
   * @api {get} /form/:title GET/ form/:title
   * @apiName GetForm
   * @apiGroup Form Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object} Form Get the form w/ given title
   * @apiError (Error 404) FormNotFound Error occures if there is no form w/ given title
   * @apiError (Error 500) internalServerError Error occured during the process from the server
   * @apiSampleRequest http://127.0.0.1:4000/api/form/form title
   * @apiSuccessExample form:
   *{
        "postSubmit": "message to show after submission",
        "preform": "message to show before form start",
        "postform": "message to show after the form ends",
        "_id": "61ad45dd7adeeb2dd472de01",
        "title": "form title",
        "description": "form description",
        "startDate": "2021-11-30T22:53:35.643Z",
        "endDate": "2021-12-30T22:53:38.320Z",
        "fields": [
            {
                "type": "Text",
                "_id": "61ad45dd7adeeb2dd472de02",
                "label": "fullname",
                "isRequired": true,
                "placeholder": "insert ur fullname",
                "options": []
            },
            {
                "type": "TextArea",
                "_id": "61ad45dd7adeeb2dd472de03",
                "label": "suggestions",
                "isRequired": false,
                "placeholder": "some suggestion...",
                "options": []
            },
            {
                "type": "Selection",
                "_id": "61ad45dd7adeeb2dd472de04",
                "label": "wanna join us !?",
                "isRequired": true,
                "options": [
                    {
                        "_id": "61ad45dd7adeeb2dd472de05",
                        "value": "yes ",
                        "label": "yes "
                    },
                    {
                        "_id": "61ad45dd7adeeb2dd472de06",
                        "value": "no",
                        "label": "no"
                    }
                ]
            }
        ],
        "createdAt": "2021-12-05T23:06:05.414Z",
        "updatedAt": "2021-12-05T23:06:05.414Z",
        "__v": 0
    }
*/
router.get("/form/:title", formController.getOneForm);

/**
 * @api {post} /form POST/ form
 * @apiName PostForm
 * @apiGroup Form Router
 * @apiError (Error 400) valdiationError Something wrong with the body of the request
 * @apiError (Error 400) valdiationError form title is taken
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiBody {string} title The title of the form
 * @apiBody {string} description The description of the form
 * @apiBody {string} postSubmit The text shown after the user submits the form
 * @apiBody {string} preEvent The text shown before the event starts
 * @apiBody {string} postEvent when the deadline of the form is over
 * @apiBody {Date} startDate start date of the form
 * @apiBody {Date} endDate end date of the form
 * @apiBody {Object} fields fields the user should fill
 * @apiSampleRequest http://127.0.0.1:4000/form
 */
router.post("/form", /*[auth, admin], */ formController.createForm);

/**
 * @api {put} /form Put/ form (The signed user)
 * @apiName putForm
 * @apiGroup Form Router
 * @apiVersion 1.0.0
 * @apiError (Error 400) valdiationError Something wrong with the body of the request
 * @apiError (Error 404) FormNotFound No form with given title
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiBody {string} title The title of the form
 * @apiBody {string} description The description of the form
 * @apiBody {string} postSubmit The text shown after the user submits the form
 * @apiBody {string} preEvent The text shown before the event starts
 * @apiBody {string} postEvent text shown when the deadline of the form is over
 * @apiBody {Date} startDate start date of the form
 * @apiBody {Date} endDate end date of the form
 * @apiBody {Object} fields fields the user should fill
 * @apiSampleRequest http://127.0.0.1:4000/api/form/form title
 */
router.put("/form/:title", [auth, admin], formController.updateForm);

/**
 * @api {delete} /form/:title DELETE/ form/:title
 * @apiName DeleteFormByTitle
 * @apiGroup Form Router
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiError (Error 404) FormNotFound No form with given title
 * @apiParam {String} title title of the form
 * @apiSampleRequest http://127.0.0.1:4000/title/form title
 */
router.delete("/form/:title", [auth, admin], formController.deleteOneForm);

/**
 * @api {delete} /form DELETE/ form
 * @apiName DeleteAllforms
 * @apiGroup Form Router
 * @apiError (Error 404) FormsNotFound No forms in the databse
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiSampleRequest http://127.0.0.1:4000/form
 */
router.delete("/form", [auth, admin], formController.deleteAllForms);

module.exports = router;
