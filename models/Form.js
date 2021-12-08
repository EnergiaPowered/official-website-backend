const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    /* The text shown after the user submits the form */
    postSubmit: {
      type: String,
      default: "Thank you for submitting the form",
    },
    /* The text shown before the event starts */
    preEvent: {
      type: String,
      default: `The event will start soon \n Stay tuned!`,
    },
    /* when the deadline of the form is over */
    postEvent: {
      type: String,
      default: "Sorry the deadline of this form is over",
    },
    fields: [
      {
        label: { type: String, required: true },
        type: {
          type: String,
          required: true,
          enum: ["Text", "TextArea", "Selection"],
          default: "Text",
        },
        placeholder: { type: String },
        isRequired: {
          type: Boolean,
          required: true,
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);
