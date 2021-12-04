const { User } = require("../models/User");
const router = require("express").Router();
const resetPasswordController = require("../controllers/resetPasswordController");

router.post("/forget_password", resetPasswordController.postForgetPassword);

router.post("/reset", resetPasswordController.postResetPassword);

module.exports = router;
