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
};
