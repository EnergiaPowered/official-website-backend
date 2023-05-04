const router = require("express").Router();
const blogCommentController = require("../controllers/blogCommentController");

// Import authorization middleWares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const participantsController = require("../controllers/participantsController");

console.log("participantsCertificates.js");
router.post("/participant-certificate", auth, participantsController.saveCertificate);
router.get("/verify-certificate/:serial", participantsController.getCertificate);



module.exports = router;
