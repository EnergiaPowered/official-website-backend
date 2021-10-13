const Joi = require("joi");
const auth = require("../middleware/auth");
const router = require("express").Router();
const userController = require("../controllers/userController");

function validate_update(user) {
  const passwordValidations = {
    min: 8,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 4,
  };

  const schema = Joi.object({
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(7).max(15).required(),
    password: passwordComplexity(passwordValidations),
    confirm_password: passwordComplexity(passwordValidations),
    university: Joi.string().min(2).max(100).required(),
    faculty: Joi.string().min(2).max(100).required(),
    department: Joi.string().min(2).max(100).allow(""),
    graduationYear: Joi.number()
      .min(new Date(Date.now()).getFullYear() - 7)
      .max(new Date(Date.now()).getFullYear() + 7)
      .required(),
    isGraduated: Joi.boolean(),
  });
  return schema.validate(user);
}

// get info about the user from his JWT Token
router.get("/me", auth, userController.getTheSignedInUser);
//	Creating a new user
router.post("/users", userController.postOneUser);
router.put("/users", auth, userController.putSignedUser);
router.delete("/users", auth, userController.deleteUser);

module.exports = router;
