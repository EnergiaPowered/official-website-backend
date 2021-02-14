const mongoose = require('mongoose');

// member database schema
const memberSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    committee: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    imageID: {
        type: String,
        required: true
    },
    isBest: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Member', memberSchema, 'crew');