// Importing Model
const Blog = require("../models/Blog");

module.exports = {
  getBlogs: (req, res) => {
    Blog.find({})
      .sort({ createdAt: -1 })
      .exec((err, blogs) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.status(200).json(blogs);
      });
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
  deleteOneBlog: (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, blog) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (!blog) {
        console.log("Error 404: Blog not found");
        return res.status(404);
      }
      res.sendStatus(200);
    });
  },
  deleteAllBlogs: (req, res) => {
    Blog.deleteMany({}, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.sendStatus(200);
    });
  },
};
