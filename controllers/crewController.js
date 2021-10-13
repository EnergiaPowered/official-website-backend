// Importing Model
const Member = require("../models/Member");

module.exports = {
  getAllCrew: (req, res) => {
    Member.find(req.query)
      .sort({ committee: 1 })
      .exec((err, crew) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.status(200).json(crew);
      });
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
      } else res.sendStatus(400);
    } catch (err) {
      res.status(400).send(err.mapped());
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
  deleteOne: (req, res) => {
    Member.findOneAndRemove({ ID: req.params.id }, (err, member) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (!member) {
        console.log("Error 404: Member not found");
        return res.status(404);
      }
      res.sendStatus(200);
    });
  },
  deleteAll: (req, res) => {
    Member.deleteMany({}, (err, crew) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (!crew) {
        console.log("Error 404: Crew not found");
        return res.status(404);
      }
      res.sendStatus(200);
    });
  },
};
