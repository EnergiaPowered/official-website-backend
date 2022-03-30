// Importing Model
const Member = require("../models/Member");
const { validationResult } = require("express-validator");

module.exports = {
  getAllCrew: async (req, res) => {
    try {
      const crew = await Member.find(req.query).sort({ committee: 1 });
      if (!crew) {
        return res.status(404).json({ message: "No Crew found" });
      }
      res.status(200).json(crew);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getMember: async (req, res) => {
    try {
      const member = await Member.findOne({ ID: req.params.id });
      if (!member) {
        res.status(404).json({ message: "No Member found" });
      }
      res.status(200).json(member);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  postMember: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        validationResult(req).throw();
        let newMember = new Member(req.body);
        newMember.save((err, member) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          res.sendStatus(200);
        });
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      res.status(400).send(err.mapped);
    }
  },
  putOneCrew: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        validationResult(req).throw();
        Member.findOneAndUpdate(
          { ID: req.params.id },
          { $set: req.body },
          (err, member) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            if (!member) {
              console.log("Error 404: Member not found");
              return res.status(404);
            }
            res.sendStatus(200);
          }
        );
      } else res.sendStatus(400);
    } catch (err) {
      res.status(400).send(err.mapped());
    }
  },
  deleteOne: async (req, res) => {
    try {
      const deletedMember = await Member.findOneAndRemove({
        ID: req.params.id,
      });
      if (!deletedMember) {
        const err = new Error();
        err.message = "Member not found";
        res.status(404).send(err);
      }
      res.status(200).json({ message: "Deleted" });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  deleteAll: async (req, res) => {
    try {
      const crew = await Member.deleteMany({});
      if (!crew) {
        console.log("Error 404: Crew not found");
        return res.status(404);
      }
      res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
