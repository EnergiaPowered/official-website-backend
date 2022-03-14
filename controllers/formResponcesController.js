const { db } = require("../firebaseSetup");
const formResponce = db.collection("formResponces");
module.exports = {
  saveFormResponce: async (req, res) => {
    try {
      const responce = await formResponce
        .doc(`${req.body.first}`)
        .set(req.body);
      return res.status(200).json({ message: "ok" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAllFormResponce: async (req, res) => {
    try {
      if (req.query.form) {
        const docs = [];
        const documentsOfForm = await formResponce
          .where("form", "==", req.query.form)
          .get();
        documentsOfForm.forEach((doc) => {
          docs.push(doc);
        });
        res.status(200).json(docs);
      } else {
        const docs = [];
        const getresponces = await formResponce.get();
        //We have to loop over the collection to get all documents
        getresponces.forEach((doc) => {
          docs.push(doc);
        });
        res.status(200).json(docs);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getDocumentById: async (req, res) => {
    try {
      const responce = await formResponce.doc(req.params.id).get();
      if (!responce.form) {
        return res.status(404).json({ message: "notfound" });
      }
      res.status(200).json(responce);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getDocumentByForm: async (req, res) => {
    try {
      console.log("hi");
      const documentsOfForm = await formResponce
        .where("form", "==", req.query.form)
        .get();
      res.status(200).send(documentsOfForm);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
