const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageID: {
        type: String,
        required: true
    },
    isMain: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Sponsor", sponsorSchema);