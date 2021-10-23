const Joi = require("joi");
const auth = require("../middleware/auth");
const router = require("express").Router();
const userController = require("../controllers/userController");

// get info about the user from his JWT Token
router.get("/me", auth, userController.getTheSignedInUser);
//	Creating a new user
router.post("/users", userController.postOneUser);
router.put("/users", auth, userController.putSignedUser);
router.delete("/users", auth, userController.deleteUser);

//get all users
router.get("/users", userController.getAllUsers);

module.exports = router;
