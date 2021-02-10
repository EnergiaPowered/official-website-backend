const express = require("express");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");

// Importing Model
const Committee = require("../models/Committee");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Defining a Checking Schema for the committee
const committeeCheckSchema = checkSchema({
    title: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    icon_class: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    mission: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    vision: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    jobDescription: {
        isArray: true,
        exists: {
            options: {
                checkFalsy: true
            }
        }
    }
});

// Retrieve all committees
router.get("/committees", (req, res) => {
    Committee.find({}, (err, crew) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.status(200).json(crew);
    });
});

// insert new committee w/ validation and sanitization
router.post("/committees", [committeeCheckSchema], (req, res) => {
    try {
        if (req.body && req.body !== {}) {
            validationResult(req).throw();
            let newCommittee = new Committee(req.body);
            newCommittee.save((err) => {
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

// edit a committee w/ validation and sanitization
router.put("/committees/:id", [committeeCheckSchema], (req, res) => {
    try {
        if (req.body && req.body !== {}) {
            validationResult(req).throw();
            Committee.findByIDAndUpdate(req.params.id, { $set: req.body }, ((err, committee) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                if (!committee) {
                    console.log("Error 404: Committee not found");
                    return res.status(404);
                }
                res.sendStatus(200);
            }));
        } else res.sendStatus(400);
    } catch (err) {
        res.status(400).send(err.mapped());
    }
});

// delete a committee
router.delete("/committees/:id", (req, res) => {
    Committee.findByIdAndRemove(req.params.id, (err, committee) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        if (!committee) {
            console.log("Error 404: Committee not found");
            return res.status(404);
        }
        res.sendStatus(200);
    });
});

// delete all committees
router.delete("/committees", (req, res) => {
    Committee.deleteMany({}, (err, committees) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        if (!committees) {
            console.log("Error 404: Committees not found");
            return res.status(404);
        }
        res.sendStatus(200);
    });
});

module.exports = router;