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
      const comments = blog.comments;
      res.status(200).send(comments);
    } catch (err) {
      res.status(500).json({ err });
    }
  },
  postBlogComment: async (req, res) => {
    try {
      const userID = req.user._id;
      const user = await User.findById(userID);
      console.log(user);
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
      res.status(201).json({ message: "comment added successfully" });
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
      const blogID = req.params.id;
      const commentID = req.params.cid;
      Blog.findOneAndUpdate(
        { _id: blogID, "comments._id": commentID },
        { $set: { "comments.$.content": result.value.content } },
        { multi: true },
        (err, blog) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
          if (!blog) {
            return res
              .status(404)
              .send({ message: "blog or comment not found" });
          }
          res.sendStatus(200);
        }
      );
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  },
  deleteOneComment: async (req, res) => {
    try {
      const blogID = req.params.id;
      const commentID = req.params.cid;
      const blog = await Blog.findById(blogID);
      if (!blog) return res.status(404).send({ message: "blog not found" });
      const comment = blog.comments.id(commentID);
      if (!comment) {
        return res.status(404).send({ message: "comment not found" });
      }
      comment.remove();
      await blog.save();
      res.status(200).json({ message: "comment deleted successfully" });
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  },
};
