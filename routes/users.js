const Joi = require("joi");
const auth = require("../middleware/auth");
const router = require("express").Router();
const userController = require("../controllers/userController");

/**
   * @api {get} /me GET/ me
   * @apiName GetTheSignedUser
   * @apiGroup Users Router
   * @apiHeader (Header) {String} x-auth-token the token when the user signed in
   * @apiVersion 1.0.0
   * @apiSuccess {Object} User Get the signed in user
   * @apiError (Error 404) UserNotFound Error occures if the user was deleted from the database
   * @apiError (Error 401) Unauthorized Error occures if there were no user
   * @apiSampleRequest http://127.0.0.1:4000/api/me
   * @apiSuccessExample user:
   *{
        "department": "ELECTRICAL",
        "isAdmin": false,
        "verified": true,
        "_id": "60296321bdcc7b14bc36f246",
        "firstname": "mostafa",
        "lastname": "kamal",
        "phone": "01020374031",
        "email": "2143578@gmail.com",
        "password": "$2b$10$7DjtYxsNVCFCDukeDcy6Aedqn4OnOBsoLarJpRBtftzr8OWecQl8W",
        "isGraduated": false,
        "university": "ASU",
        "faculty": "ENG",
        "graduationYear": 2025,
        "createdAt": "2021-02-14T17:51:29.190Z",
        "updatedAt": "2021-02-15T22:53:59.304Z",
        "__v": 0
    }
*/
// get info about the user from his JWT Token
router.get("/me", auth, userController.getTheSignedInUser);

/**
 * @api {post} /users Post/ users
 * @apiName postUser
 * @apiGroup Users Router
 * @apiVersion 1.0.0
 * @apiSuccess {object[]} message You have registered successfully. Please check your email for verification.
 * @apiError (Error 400) valdiationError Something wrong with the body of the request
 * @apiBody {String} department The department which the student in
 * @apiBody {String} firstname The first name of the student
 * @apiBody {String} lastname The last name of the student
 * @apiBody {String} phone The phone number of the student
 * @apiBody {String} email The email of the student
 * @apiBody {String} password The password of the student
 * @apiBody {String} confirm_password The confirmation of the password of the student
 * @apiBody {Boolean} isGraduated The user was graduated or still student
 * @apiBody {String} university The university inwhich the student studies
 * @apiBody {String} faculty The faculty inwhich the student studies
 * @apiBody {String} graduationYear The year inwhich the student will be graduated
 * @apiSampleRequest http://127.0.0.1:4000/api/users
 */
//	Creating a new user
router.post("/users", userController.postOneUser);

/**
 * @api {put} /users Put/ users (The signed user)
 * @apiName putUser
 * @apiGroup Users Router
 * @apiVersion 1.0.0
 * @apiError (Error 400) valdiationError Something wrong with the body of the request
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiHeader (Header) {String} x-auth-token the token when the user signed in
 * @apiBody {String} firstname The first name of the student
 * @apiBody {String} lastname The last name of the student
 * @apiBody {String} phone The phone number of the student
 * @apiBody {String} email The email of the student
 * @apiBody {String} password The password of the student
 * @apiBody {String} confirm_password The confirmation of the password of the student
 * @apiBody {Boolean} isGraduated The user was graduated or still student
 * @apiBody {String} university The university inwhich the student studies
 * @apiBody {String} faculty The faculty inwhich the student studies
 * @apiBody {String} graduationYear The year inwhich the student will be graduated
 * @apiSampleRequest http://127.0.0.1:4000/api/users
 */
router.put("/users", auth, userController.putSignedUser);

/**
 * @api {delete} /users Delete/ users (The signed user)
 * @apiName deleteUser
 * @apiGroup Users Router
 * @apiSuccess {String} message {$user.name} has been Deleted
 * @apiVersion 1.0.0
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiHeader (Header) {String} x-auth-token the token when the user signed in
 * @apiSampleRequest http://127.0.0.1:4000/api/users
 */
router.delete("/users", auth, userController.deleteUser);

/**
   * @api {get} /users GET/ users
   * @apiName GetAllUsers
   * @apiGroup Users Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object[]} User A list of all user objects
   * @apiError (Error 500) internalServerError Error occured during the process from the server 
   * @apiSampleRequest http://127.0.0.1:4000/api/users
   * @apiSuccessExample users:
   *[
    {
        "department": "ELECTRICAL",
        "isAdmin": false,
        "verified": true,
        "_id": "60296321bdcc7b14bc36f246",
        "firstname": "mostafa",
        "lastname": "kamal",
        "phone": "01020374031",
        "email": "2143578@gmail.com",
        "password": "$2b$10$7DjtYxsNVCFCDukeDcy6Aedqn4OnOBsoLarJpRBtftzr8OWecQl8W",
        "isGraduated": false,
        "university": "ASU",
        "faculty": "ENG",
        "graduationYear": 2025,
        "createdAt": "2021-02-14T17:51:29.190Z",
        "updatedAt": "2021-02-15T22:53:59.304Z",
        "__v": 0
    },
    {
        "department": "Computer",
        "isAdmin": true,
        "verified": true,
        "_id": "6082d2b97d12b2001522682a",
        "firstname": "Abdullah",
        "lastname": "Adel",
        "phone": "01099011597",
        "email": "abdullahadel.aam@gmail.com",
        "password": "$2b$10$JRkC1YBogRkmUZO8TvrHgemwaSUICYuSBMg5j9R6fAKNqFOIbuHhC",
        "isGraduated": false,
        "university": "Cairo",
        "faculty": "Engineering",
        "graduationYear": 2023,
        "createdAt": "2021-04-23T13:59:21.398Z",
        "updatedAt": "2021-04-23T13:59:39.860Z",
        "__v": 0
    },
    {
        "department": "Systems and Computers",
        "isAdmin": false,
        "verified": true,
        "_id": "6085a6d5beb0160015543f08",
        "firstname": "Mohammed",
        "lastname": "Abdellatif",
        "phone": "021314648",
        "email": "salama.mody@yahoo.com",
        "password": "$2b$10$WzBCdOSaPWjhP8T9ooaeTuRzbSCeiMH0MdBSAQuv6aM.MbQZQkMVe",
        "isGraduated": false,
        "university": "Al-Azhar",
        "faculty": "Engineering",
        "graduationYear": 2021,
        "createdAt": "2021-04-25T17:28:53.983Z",
        "updatedAt": "2021-04-25T17:29:23.963Z",
        "__v": 0
    },
    {
        "department": "Computer",
        "isAdmin": false,
        "verified": true,
        "_id": "608cc8f0bfdd3c2c486124ce",
        "firstname": "Mostafa",
        "lastname": "Kamal",
        "phone": "01099011598",
        "email": "abdullah.alshawafi@yahoo.com",
        "password": "$2b$10$FleJ0YxYK4u516aZ8lhAUuYjvPDNA0hjcCWsqotgNnXbgIs68HMh2",
        "isGraduated": false,
        "university": "Cairo",
        "faculty": "Engineering",
        "graduationYear": 2023,
        "createdAt": "2021-05-01T03:20:16.828Z",
        "updatedAt": "2021-05-01T03:20:16.828Z",
        "__v": 0
    }
]
*/
//get all users
router.get("/users", userController.getAllUsers);

module.exports = router;
