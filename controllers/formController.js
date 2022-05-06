const Form = require("../models/Form");
const formFireBase = require("./formResponcesController");

module.exports = {
  getForms: async (req, res) => {
    try {
      const forms = await Form.find({}).sort({ createdAt: -1 });
      if (!forms[0]) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(forms);
    } catch (err) {
      res.status(500).json({
        message: "Error occured while getting the db",
      });
    }
  },
  getOneForm: async (req, res) => {
    try {
      const title = req.params.title.split("-").join(" ");
      const form = await Form.find({ title });
      if (!form) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(form);
    } catch (err) {
      res.status(500).json({
        message: "Error occured while getting the db",
      });
    }
  },
  createForm: async (req, res) => {
    try {
      const title = await Form.exists({ title: req.body.title });
      if (title) {
        return res.status(400).send("Title is taken");
      }
      if (req.body && req.body !== {}) {
        const newForm = new Form(req.body);
        newForm.save((err, form) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          formFireBase.saveFormResponce(req);
          return res.status(200).json({ message: "ok" });
        });
      } else res.sendStatus(400);
    } catch (err) {
      res.status(500).json({
        message: "Error occurred while getting the db",
      });
    }
  },
  updateForm: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        title = req.params.title.split("-").join(" ");
        Form.findOneAndUpdate({ title }, { $set: req.body }, (err, form) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          if (!form) {
            console.log("Error 404: Form not found");
            return res.status(404);
          }
          res.sendStatus(200);
        });
      } else res.sendStatus(400);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  deleteOneForm: async (req, res) => {
    try {
      title = req.params.title.split("-").join(" ");
      const form = await Form.findOneAndRemove({ title });
      if (!form) {
        return res.status(404).json({ message: "Not found" });
      }
      res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  deleteAllForms: async (req, res) => {
    try {
      let forms = await Form.find({});
      if (!forms[0]) {
        return res.status(404).json({ message: "Not found" });
      }
      forms = await Form.deleteMany({});
      res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
