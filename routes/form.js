const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
// Import authorization middleWares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/form", formController.getForms);
router.get("/form/:id", formController.getOneForm);
router.post("/form" /*, [auth, admin]*/, formController.createForm);
router.put("/form/:id", [auth, admin], formController.updateForm);
router.delete("/form/:id", [auth, admin], formController.deleteOneForm);
router.delete("/form", /* [auth, admin],*/ formController.deleteAllForms);

module.exports = router;
