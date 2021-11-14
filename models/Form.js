const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
  formSubmitted: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  /* when the deadline of the form is over */
  formFinished: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

module.exports = mongoose.model("Form", formSchema);
