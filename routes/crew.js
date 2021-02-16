const express = require("express");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");

// Importing Model
const Member = require("../models/Member");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Defining a Checking Schema for the Member
const memberCheckSchema = checkSchema({
    ID: {
        isNumeric: true,
        exists: {
            options: {
                checkFalsy: true
            }
        }
    },
    name: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    committee: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    position: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    imageID: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    }
});

// Retrieve crew
router.get("/crew", (req, res) => {
    Member.find(req.query, (err, crew) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.status(200).json(crew);
    });
});

// insert new member w/ validation and sanitization
router.post("/crew/member", [memberCheckSchema], (req, res) => {
    try {
        if (req.body && req.body !== {}) {
            validationResult(req).throw();
            let newMember = new Member(req.body);
            newMember.save((err, member) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.sendStatus(200);
            });
        } else res.sendStatus(400);
    } catch (err) {
        res.status(400).send(err.mapped());
    }
});

// edit a member w/ validation and sanitization
router.put("/crew/:id", [memberCheckSchema], (req, res) => {
    try {
        if (req.body && req.body !== {}) {
            validationResult(req).throw();
            Member.findOneAndUpdate({ ID: req.params.id }, { $set: req.body }, ((err, member) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                if (!member) {
                    console.log("Error 404: Member not found");
                    return res.status(404);
                }
                res.sendStatus(200);
            }));
        } else res.sendStatus(400);
    } catch (err) {
        res.status(400).send(err.mapped());
    }
});

// delete a member
router.delete("/crew/:id", (req, res) => {
    Member.findOneAndRemove({ ID: req.params.id }, (err, member) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        if (!member) {
            console.log("Error 404: Member not found");
            return res.status(404);
        }
        res.sendStatus(200);
    });
});

// delete all crew
router.delete("/crew", (req, res) => {
    Member.deleteMany({}, (err, crew) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        if (!crew) {
            console.log("Error 404: Crew not found");
            return res.status(404);
        }
        res.sendStatus(200);
    });
});

module.exports = router;