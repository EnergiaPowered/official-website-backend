const Sponsor = require("../models/Sponsor");
const { validationResult } = require("express-validator");

module.exports = {
    getSponsors: async (req, res) => {
        try {
            const sponsors = await Sponsor.find({});
            res.status(200).json(sponsors);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    },
    postSponsor: async (req, res) => {
        try {
            if (Object.keys(req.body).length !== 0){
                validationResult(req).throw();
                let newSponsor = new Sponsor(req.body);
                newSponsor.save((err, sponsor) => {
                    if (err) {
                        return res.status(500).json({message: err.message});
                    }
                    res.sendStatus(200);
                });
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            let errorObject = {};
            err.errors.forEach(error => {
                errorObject[error.param] = error.msg;
            })
            res.status(422).json(errorObject);
        }
    },
    putSponsor: async (req, res) => {
        try {
            if (Object.keys(req.body).length !== 0) {
                validationResult(req).throw();
                let {name: sponsorName} = req.params;
                Sponsor.findOneAndUpdate(
                    {name: sponsorName},
                    {$set: req.body},
                    (err, sponsor) => {
                        if (err) {
                            return res.status(500).json({message: err.message});
                        }
                        if (!sponsor) {
                            return res.sendStatus(404);
                        }
                        res.sendStatus(200);
                    }
                )
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            let errorObject = {};
            err.errors.forEach(error => {
                errorObject[error.param] = error.msg;
            })
            res.status(422).json(errorObject);
        }
    },
    deleteSingleSponsor: async (req, res) => {
        try {
            const {name: sponsorName} = req.params;
            const sponsor = await Sponsor.findOneAndRemove({ name: sponsorName });
            if (!sponsor) {
                return res.status(404).json({ message: "Not Found" });
            }
            res.sendStatus(200);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    deleteAllSponsors: async (req, res) => {
        try {
            await Sponsor.deleteMany({});
            res.sendStatus(200);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
};