const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["text", "textArea", "select"],
    default: "text",
  },
  isRequired: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Question", questionSchema);
