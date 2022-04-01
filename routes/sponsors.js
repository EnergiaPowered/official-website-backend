const express = require('express');
const router = express.Router();
const sponsorController = require("../controllers/sponsorsController");
const { checkSchema } = require("express-validator");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const sponsorCheckSchema = checkSchema({
    name: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            },
        },
        rtrim: true,
        escape: true,
    },
    imageID: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            },
        },
        rtrim: true,
        escape: true,
    },
});

router.get("/sponsors", sponsorController.getSponsors);
router.post("/sponsors", [/*auth, admin,*/ sponsorCheckSchema], sponsorController.postSponsor);
router.put("/sponsors/:name", [/*auth, admin,*/ sponsorCheckSchema], sponsorController.putSponsor);
router.delete("/sponsors/:sponsorName", /*[auth, admin],*/ sponsorController.deleteOneSponsor);
router.delete("/sponsors", /*[auth, admin],*/ sponsorController.deleteAllSponsors);

module.exports = router;