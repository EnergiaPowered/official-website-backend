const express = require("express");
const formResponcesController = require("../controllers/formResponcesController");
const router = express.Router();
const formResponceController = require("../controllers/formResponcesController");
router.post("/formRes", formResponceController.saveFormResponce);
router.get("/formRes", formResponceController.getAllFormResponce);
router.get("/formRes/:form", formResponceController.getDocumentByForm);
router.put("/formRes/:form", formResponceController.updateForm);

module.exports = router;
