const express = require("express");
const router = express.Router();
const formResponceController = require("../controllers/formResponcesController");

// Import authorization middleWares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/formRes", auth, admin, formResponceController.getAllFormResponce);

router.get("/formRes/:form", auth, admin, formResponceController.getDocumentByForm);

router.post("/formRes", auth, admin, formResponceController.saveFormResponce);

router.put("/formRes/:form", formResponceController.updateForm);

module.exports = router;
