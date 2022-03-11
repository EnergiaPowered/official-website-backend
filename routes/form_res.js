const express = require("express");
const router = express.Router();
const formResponceController = require("../controllers/formResponcesController");
router.post("/formRes", formResponceController.saveFormResponce);
module.exports = router;
