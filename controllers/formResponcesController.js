const { db } = require("../firebaseSetup");
const formResponce = db.collection("formResponces");
module.exports = {
  saveFormResponce: async (req) => {
    try {
      await formResponce.doc(`${req.body.name}`).set(req.body);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteOneForm: async (title) => {
    try {
      await formResponce.doc(`${title}`).delete();
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteAllForms: async () => {
    try {
      const getresponces = await formResponce.get();
      //We have to loop over the collection to delete documents one by one
      getresponces.forEach((doc) => {
        deleteOneForm(doc.name);
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAllFormResponce: async (req, res) => {
    try {
      const docs = [];
      const getresponces = await formResponce.get();
      //We have to loop over the collection to get all documents
      getresponces.forEach((doc) => {
        docs.push(doc.data());
      });
      res.status(200).json(docs);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getDocumentByForm: async (req, res) => {
    try {
      const form = req.params.form.split("-").join(" ");
      let document = await formResponce.doc(form).get();
      if (!document.data()) {
        return res.status(404).json({ message: "Not found" });
      }
      document = document.data();
      res.status(200).json(document);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateForm: async (req, res) => {
    try {
      form = req.params.form.split("-").join(" ");
      let document = await formResponce.doc(form).get();
      document = document.data();
      if (!document) {
        return res.status(404).json({ message: "Not found" });
      }
      let content = document.content;
      content.push(req.body.content);
      await formResponce.doc(form).update({
        content: content,
      });
      res.status(200).json({ message: "ok" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
