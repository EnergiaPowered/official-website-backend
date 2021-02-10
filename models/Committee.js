const mongoose = require('mongoose');

// committee database schema
const committeeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon_class: {
        type: String,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    vision: {
        type: String,
        required: true
    },
    jobDescription: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Committee', committeeSchema, 'committees');