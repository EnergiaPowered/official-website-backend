const Form = require("../models/Form");

module.exports = {
  getForms: async (req, res) => {
    try {
      const forms = await Form.find({}).sort({ createdAt: -1 });
      res.status(200).json(forms);
    } catch (err) {
      res.status(500).json({
        message: "Error occured while getting the db",
      });
    }
  },
  getOneForm: async (req, res) => {
    try {
      const form = await Form.findById(req.params.id);
      res.status(200).json(form);
    } catch (err) {
      res.status(500).json({
        message: "Error occured while getting the db",
      });
    }
  },
  createForm: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        const newForm = new Form(req.body);
        newForm.save((err, form) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          res.sendStatus(200);
        });
      } else res.sendStatus(400);
    } catch (err) {
      res.status(500).json({
        message: "Error occured while getting the db",
      });
    }
  },
  updateForm: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        Form.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          (err, form) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            if (!form) {
              console.log("Error 404: Form not found");
              return res.status(404);
            }
            res.sendStatus(200);
          }
        );
      } else res.sendStatus(400);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  deleteOneForm: async (req, res) => {
    try {
      const form = await Form.findByIdAndRemove(req.params.id);
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
      res.status(200);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
