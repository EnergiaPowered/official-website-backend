const mongoose = require("mongoose");

// committee database schema
const committeeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Committee", committeeSchema, "committees");
