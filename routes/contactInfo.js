const express = require("express");
const router = express.Router();

// Importing Info Model
const Info = require("../models/Info");

// Retrieve contacts info
/**
 * @api {get} /contactInfo GET/ contactInfo
 * @apiName GetContactInfo
 * @apiGroup Contact Info Router
 * @apiSuccess {JSON} Info JSON object of the contact information
 * @apiSampleRequest http://127.0.0.1:4000/api/contactInfo
 * @apiSuccessExample Response
 * {
    "_id": "60246e11a925563644a79dd6",
    "address": "Faculty of Engineering Ain Shams University",
    "email": "energiapowered21@gmail.com",
    "phone": "+201148762666",
    "image": "/images/Info-map.png",
    "__v": 0
}
 */
router.get("/contactInfo", (req, res) => {
  Info.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.status(200).send(docs[0]);
  });
});

module.exports = router;
