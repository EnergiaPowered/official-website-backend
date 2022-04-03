// Importing Model
const Blog = require("../models/Blog");
const { validationResult } = require("express-validator");

module.exports = {
  getBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find({}).sort({ createdAt: -1 });
      res.status(200).json(blogs);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error occured while getting the db",
      });
    }
  },
  getOneBlog: async (req, res) => {
    try {
      const blogID = req.params.id;
      const blog = await Blog.findOne({ _id: blogID });
      if (!blog) {
        return res.status(404).json({ message: "Blog Not Found" });
      }
      res.status(200).json(blog);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error occurred",
      });
    }
  },
  postBlog: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        console.log(req.body);
        validationResult(req).throw();
        let newBlog = new Blog(req.body);
        newBlog.save((err, blog) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          res.sendStatus(200);
        });
      } else res.sendStatus(400);
    } catch (err) {
      res.status(400).send(err.mapped());
    }
  },
  putBlog: (req, res) => {
    try {
      if (req.body && req.body !== {}) {
        validationResult(req).throw();
        Blog.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          (err, blog) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
            if (!blog) {
              console.log("Error 404: Blog not found");
              return res.status(404);
            }
            res.sendStatus(200);
          }
        );
      } else res.sendStatus(400);
    } catch (err) {
      res.status(400).send(err.mapped());
    }
  },
  deleteOneBlog: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndRemove(req.params.id);
      if (!blog) {
        console.log("Error 404: Blog not found");
        return res.status(404);
      }
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  deleteAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.deleteMany({});
      res.status(200).send(blogs);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
