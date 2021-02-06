const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
    address: String,
    email: String,
    phone: String,
    image: String
});

module.exports = mongoose.model("Info", infoSchema, 'info');