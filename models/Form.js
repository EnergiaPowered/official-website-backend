const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
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
        label: { type: String, required: true },
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
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);
