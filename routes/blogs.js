const express = require("express");
const router = express.Router();
const { checkSchema, validationResult } = require("express-validator");

// Importing Model
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Defining a Checking Schema for the Blog Body
const blogCheckSchema = checkSchema({
    title: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    body: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true
    },
    author: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    category: {
        isString: true,
        exists: {
            options: {
                checkFalsy: true
            }
        },
        rtrim: true,
        escape: true
    },
    image_url: {
        isString: true,
        rtrim: true,
        escape: true
    }
});

// Retrieve all blogs
router.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.status(200).json(blogs);
    });
});

// insert new blog w/ validation and sanitization
router.post("/blogs", [/*auth, admin, */blogCheckSchema], (req, res) => {
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
});

// edit a blog w/ validation and sanitization
router.put("/blogs/:id", [/*auth, admin,*/ blogCheckSchema], (req, res) => {
    try {
        if (req.body && req.body !== {}) {
            validationResult(req).throw();
            Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, ((err, blog) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                if (!blog) {
                    console.log("Error 404: Blog not found");
                    return res.status(404);
                }
                res.sendStatus(200);
            }));
        } else res.sendStatus(400);
    } catch (err) {
        res.status(400).send(err.mapped());
    }
});

// delete a blog
router.delete("/blogs/:id", [auth, admin], (req, res) => {
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
});

// delete all blogs
router.delete("/blogs", (req, res) => {
    Blog.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});

module.exports = router;