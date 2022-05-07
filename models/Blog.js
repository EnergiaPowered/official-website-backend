const mongoose = require("mongoose");

const blogCommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    bodyMobile: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Human Resources",
        "Web Development",
        "Mobile App Development",
        "Embedded Systems",
        "C++",
      ],
    },
    image_url: {
      type: String,
      default: "",
    },
    comments: [blogCommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
