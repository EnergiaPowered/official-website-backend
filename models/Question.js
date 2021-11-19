const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* In this model we put the questions in the form */
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
  options: [
    {
      label: {
        type: String,
        required: true,
      },
      value: {
        required: true,
      },
    },
  ],
  formId: {
    type: Schema.Types.ObjectId,
    ref: "Form",
  },
});

module.exports = mongoose.model("Question", questionSchema);
