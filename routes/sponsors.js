const express = require('express');
const router = express.Router();
const sponsorController = require("../controllers/sponsorsController");
const { checkSchema } = require("express-validator");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const sponsorCheckSchema = checkSchema({
    name: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            },
        },
        rtrim: true,
        escape: true,
    },
    imageID: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            },
        },
        rtrim: true,
        escape: true,
    },
});

/**
   * @api {get} /sponsors GET/ sponsors
   * @apiName GetAllSponsors
   * @apiGroup Sponsors Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object[]} Sponsors A list of all sponsors 
   * @apiError (Error 500) internalServerError Error occured during the process from the server 
   * @apiSampleRequest http://127.0.0.1:4000/api/sponsors
   * @apiSuccessExample sponsors:
   *[
    {
        "_id": "624c028b5d069c5834a4ae47",
        "name": "Abdelatty Inc.",
        "imageID": "Pretend this is an image",
        "isMain": true,
        "__v": 0
    },
    {
        "_id": "624c02945d069c5834a4ae48",
        "name": "Abdelatty Ltd.",
        "imageID": "Pretend this is an image",
        "isMain": true,
        "__v": 0
    },
    {
        "_id": "624c02b45d069c5834a4ae49",
        "name": "Random sponsor",
        "imageID": "Pretend this is an image",
        "isMain": true,
        "__v": 0
    }
]
*/

// Retrieve all sponsors
router.get("/sponsors", sponsorController.getSponsors);

/**
   * @api {post} /sponsors POST/ sponsors
   * @apiName PostSponsor
   * @apiGroup Sponsors Router
   * @apiVersion 1.0.0
   * @apiSuccess {String} ok
   * @apiError (Error 500) internalServerError Error occured during the process from the server 
   * @apiError (Error 400) BadRequest Something wrong with the body of the request
   * @apiError (Error 422) UnprocessableEntity Request body is invalid
   * @apiBody {String} name Name of the sponsor
   * @apiBody {String} imageID Image ID of the sponsor
   * @apiBody {Boolean} isMain Whether the sponsor is a main sponsor
   * @apiSampleRequest http://127.0.0.1:4000/api/sponsors
   * @apiSuccessExample sample:
   * ok
*/

// Insert a new sponsor with validation 
router.post("/sponsors", [/*auth, admin,*/ sponsorCheckSchema], sponsorController.postSponsor);

/**
   * @api {put} /sponsors/:name PUT/ sponsors/:name
   * @apiName PutSponsor
   * @apiGroup Sponsors Router
   * @apiVersion 1.0.0
   * @apiSuccess {String} ok
   * @apiParam {String} name Name of the sponsor
   * @apiError (Error 500) internalServerError Error occured during the process from the server 
   * @apiError (Error 400) BadRequest Something wrong with the body of the request
   * @apiError (Error 404) ResourceNotFound Sponsor not found
   * @apiError (Error 422) UnprocessableEntity Request body is invalid
   * @apiBody {String} name Name of the sponsor
   * @apiBody {String} imageID Image ID of the sponsor
   * @apiBody {Boolean} isMain Whether the sponsor is a main sponsor
   * @apiSampleRequest http://127.0.0.1:4000/api/sponsors/Abdelatty Inc.
   * @apiSuccessExample sample:
   * ok
*/

// Edit a single sponsor with validation
router.put("/sponsors/:name", [/*auth, admin,*/ sponsorCheckSchema], sponsorController.putSponsor);

/**
 * @api {delete} /sponsors/:name Delete/ sponsors/:name
 * @apiName DeleteSingleSponsor
 * @apiGroup Sponsors Router
 * @apiVersion 1.0.0
 * @apiParam {string} name Name of the sponsor to be deleted
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiError (Error 404) ResourceNotFound Sponsor not found
 * @apiSampleRequest http://127.0.0.1:4000/api/sponsors/Abdelatty Inc.
 * @apiSuccessExample sample:
 * ok
 */

// delete a single sponsor
router.delete("/sponsors/:name", /*[auth, admin],*/ sponsorController.deleteSingleSponsor);

/**
 * @api {delete} /sponsors Delete/ sponsors
 * @apiName DeleteAllSponsors
 * @apiGroup Sponsors Router
 * @apiVersion 1.0.0
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiError (Error 404) ResourceNotFound Sponsor not found
 * @apiSampleRequest http://127.0.0.1:4000/api/sponsors
 * @apiSuccessExample sample:
 * ok
 */

// Delete all sponsors
router.delete("/sponsors", /*[auth, admin],*/ sponsorController.deleteAllSponsors);

module.exports = router;