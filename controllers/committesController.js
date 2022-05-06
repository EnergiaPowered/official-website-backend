// Importing Model
const Committee = require("../models/Committee");
const { validationResult } = require("express-validator");

module.exports = {
  getAllCommittees: async (req, res) => {
    try {
      const committees = await Committee.find(req.query).sort({ title: 1 });
      res.status(200).json(committees);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  postCommitte: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        validationResult(req).throw();
        req.body.image = req.body.image.replace(/&#x2F;/g, "/");
        let newCommittee = new Committee(req.body);
        newCommittee.save((err) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          res.sendStatus(200);
        });
      } else res.sendStatus(400);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  putCommitte: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        validationResult(req).throw();
        Committee.findByIDAndUpdate(
          req.params.id,
          { $set: req.body },
          (err, committee) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            if (!committee) {
              console.log("Error 404: Committee not found");
              return res.status(404);
            }
            res.sendStatus(200);
          }
        );
      } else res.sendStatus(400);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  deleteOneCommitte: async (req, res) => {
    try {
      const committee = await Committee.findByIdAndRemove(req.params.id);
      if (!committee) {
        const err = new Error();
        err.message = "Member not found";
        return res.status(404).send(err);
      }
      res.status(200).json(committee);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  deleteAllCommittes: async (req, res) => {
    try {
      const committees = await Committee.deleteMany({});
      if (!committees) {
        console.log("Error 404: Committees not found");
        return res.status(404);
      }
      res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
