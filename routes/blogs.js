const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { checkSchema, validationResult } = require("express-validator");

// Import authorization middleWares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
// Defining a Checking Schema for the Blog Body
const blogCheckSchema = checkSchema({
  title: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  body: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
  },
  bodyMobile: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
  },
  author: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  category: {
    isString: true,
    exists: {
      options: {
        checkFalsy: true,
      },
    },
    rtrim: true,
    escape: true,
  },
  image_url: {
    isString: true,
    rtrim: true,
    escape: true,
  },
});

// Retrieve all blogs
router.get("/blogs", blogController.getBlogs);

// insert new blog w/ validation and sanitization
router.post(
  "/blogs",
  [/*auth, admin, */ blogCheckSchema],
  blogController.postBlog
);

// edit a blog w/ validation and sanitization
router.put(
  "/blogs/:id",
  [/*auth, admin,*/ blogCheckSchema],
  blogController.putBlog
);

// delete a blog
router.delete("/blogs/:id", [auth, admin], blogController.deleteOneBlog);

// delete all blogs
router.delete("/blogs", blogController.deleteAllBlogs);

module.exports = router;
