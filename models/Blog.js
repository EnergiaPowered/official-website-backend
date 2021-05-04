const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    bodyMobile: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Human Resources', 'Web Development', 'Mobile App Development', 'Embedded Systems', 'C++']
    },
    image_url: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);