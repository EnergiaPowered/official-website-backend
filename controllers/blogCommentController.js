// Importing Model
const Blog = require("../models/Blog");
const { User } = require("../models/User");
const Joi = require("joi");

// validatee the data
function validate(body) {
  const schema = Joi.object({
    content: Joi.string().trim().required(),
  });
  return schema.validate(body);
}

module.exports = {
  getAllBlogComments: async (req, res) => {
    try {
      const blogID = req.params.id;
      const blog = await Blog.findById(blogID);
      if (!blog) {
        return res.status(404).send("blog not found");
      }
      const comments = blog.comments.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      res.status(200).send(comments);
    } catch (err) {
      res.status(500).json({ err });
    }
  },
  postBlogComment: async (req, res) => {
    try {
      const userID = req.user._id;
      const user = await User.findById(userID);
      const result = validate(req.body);
      if (result.error) {
        return res
          .status(400)
          .json({ message: result.error.details[0].message });
      }
      const commentData = {
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        content: result.value.content,
      };
      const blogID = req.params.id;
      const blog = await Blog.findById(blogID);
      if (!blog) return res.status(404).send({ message: "blog not found" });
      blog.comments.push(commentData);
      await blog.save();
      res
        .status(201)
        .json({ message: "comment added successfully", comment: commentData });
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  },
  putBlogComment: async (req, res) => {
    try {
      const result = validate(req.body);
      if (result.error) {
        return res
          .status(400)
          .json({ message: result.error.details[0].message });
      }
      const userID = req.user._id;
      const user = await User.findById(userID);
      const blogID = req.params.id;
      const commentID = req.params.cid;
      console.log(user.email);
      Blog.findById(blogID, (err, blog) => {
        if (!err) {
          if (!blog) {
            return res.status(404).send("Blog was not found");
          } else {
            const comment = blog.comments.id(commentID);
            if (!comment) {
              return res.status(404).send("comment was not found");
            }
            if (comment.email === user.email) {
              comment.content = result.value.content;
            } else {
              return res.status(401).send({ message: "Not Auth" });
            }

            blog.markModified("comments");
            blog.save((err) => {
              if (!saveErr) {
                res.sendStatus(200);
              } else {
                res.status(500).send(saveErr.message);
              }
            });
          }
        } else {
          res.status(500).send(err.message);
        }
      });
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  },
  deleteOneComment: async (req, res) => {
    try {
      const userID = req.user._id;
      const user = await User.findById(userID);
      const blogID = req.params.id;
      const commentID = req.params.cid;
      const blog = await Blog.findById(blogID);
      if (!blog) return res.status(404).send({ message: "blog not found" });
      const comment = blog.comments.id(commentID);
      if (!comment) {
        return res.status(404).send({ message: "comment not found" });
      }
      if (comment.email === user.email) {
        comment.remove();
        await blog.save();
        res.status(200).json({ message: "comment deleted successfully" });
      } else {
        return res.status(401).send({ message: "Not Auth" });
      }
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  },
};
