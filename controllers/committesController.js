// Importing Model
const Committee = require("../models/Committee");

module.exports = {
  getAllCommittes: (req, res) => {
    Committee.find(req.query)
      .sort({ title: 1 })
      .exec((err, crew) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.status(200).json(crew);
      });
  },
  postCommitte: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        validationResult(req).throw();
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
      res.status(400).send(err.mapped());
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
      res.status(400).send(err.mapped());
    }
  },
  deleteOneCommitte: (req, res) => {
    Committee.findByIdAndRemove(req.params.id, (err, committee) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (!committee) {
        console.log("Error 404: Committee not found");
        return res.status(404);
      }
      res.sendStatus(200);
    });
  },
  deleteAllCommittes: (req, res) => {
    Committee.deleteMany({}, (err, committees) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (!committees) {
        console.log("Error 404: Committees not found");
        return res.status(404);
      }
      res.sendStatus(200);
    });
  },
};
