const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
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