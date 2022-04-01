const Sponsor = require("../models/Sponsor");
const { validationResult } = require("express-validator");

module.exports = {
    getSponsors: async (req, res) => {
        try {
            const sponsors = await Sponsor.find({});
            res.status(200).json(sponsors);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Error occurred while getting sponsors."
            });
        }
    },
    postSponsor: async (req, res) => {
        try {
            if (Object.keys(req.body).length !== 0){
                console.log(req.body);
                validationResult(req).throw();
                let newSponsor = new Sponsor(req.body);
                newSponsor.save((err, sponsor) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }
                    res.sendStatus(200);
                });
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    putSponsor: async (req, res) => {
        try {
            if (Object.keys(req.body).length !== 0) {
                validationResult(req.body).throw();
                let name = req.params.name;
                Sponsor.findOneAndUpdate(
                    name,
                    {$set: req.body},
                    (err, sponsor) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        if (!sponsor) {
                            console.log("Error 404: Sponsor not found");
                            return res.sendStatus(404);
                        }
                        res.sendStatus(200);
                    }
                )
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    deleteOneSponsor: async (req, res) => {
        try {
            const sponsorName = req.params.sponsorName;
            const sponsor = await Sponsor.findOneAndRemove({ name: sponsorName });
            if (!sponsor) {
                return res.status(404).json({ message: "Not Found" });
            }
            res.sendStatus(200);
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    deleteAllSponsors: async (req, res) => {
        try {
            let sponsors = await Sponsor.find({});
            if (!sponsors[0]) {
                return res.status(404).json({ message: "Not Found" });
            }
            await Sponsor.deleteMany({});
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err);
        }
    }
};