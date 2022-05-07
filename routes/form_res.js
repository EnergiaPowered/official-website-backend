const express = require("express");
const router = express.Router();
const formResponceController = require("../controllers/formResponcesController");

// Import authorization middleWares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/formRes", formResponceController.getAllFormResponce);

router.get("/formRes/:form", formResponceController.getDocumentByForm);

router.post("/formRes", auth, admin, formResponceController.saveFormResponce);

router.put("/formRes/:form", auth, admin, formResponceController.updateForm);

module.exports = router;
