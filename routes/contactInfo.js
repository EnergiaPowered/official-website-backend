const express = require('express');
const router = express.Router();

// Importing Info Model
const Info = require("../models/Info");

// Retrieve contacts info
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