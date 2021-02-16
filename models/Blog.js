const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    category: {
        type: String,
        enum: ['Web Development', 'Mobile Development', 'Embeded System']
    },
    image_url: String
});

module.exports = mongoose.model("Blog", blogSchema);