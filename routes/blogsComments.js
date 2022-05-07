const router = require("express").Router();
const blogCommentController = require("../controllers/blogCommentController");

// Import authorization middleWares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/**
   * @api {get} /blogs/:id/comments GET/ blogs/:id/comments
   * @apiName GetAllBlog'sComments
   * @apiGroup BlogsComments Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object[]} Comments A list of all comments on a blog 
   * @apiError (Error 500) internalServerError Error occured during the process from the server 
   * @apiError (Error 404) BlogNotFound error occur when there is no blog w given id 
   * @apiParam {String} id id of the blog
   * @apiSampleRequest http://127.0.0.1:4000/api/blogs/5/comments
   * @apiSuccessExample comments:
   *[
    {
        "_id": "627420e28c606715b4466759",
        "name": "abdallah",
        "email": "abdalluh@gmail.com",
        "content": "what a wondurful comment",
        "createdAt": "2022-05-05T19:09:22.935Z",
        "updatedAt": "2022-05-05T19:09:22.935Z"
    },
    {
        "_id": "627420e98c606715b446675a",
        "name": "ahmed",
        "email": "ahmed@gmail.com",
        "content": "what a wondurful comment",
        "createdAt": "2022-05-05T19:09:29.338Z",
        "updatedAt": "2022-05-05T19:09:29.338Z"
    },
    {
        "_id": "627420f88c606715b446675b",
        "name": "basel",
        "email": "basel@gmail.com",
        "content": "what wondurful comment",
        "createdAt": "2022-05-05T19:09:44.794Z",
        "updatedAt": "2022-05-05T19:09:44.794Z"
    }
]
*/
//get all blog's comments
router.get("/blogs/:id/comments", blogCommentController.getAllBlogComments);

/**
 * @api {post} /blogs/:id/comment POST/ blogs/:id/comment
 * @apiName PostCommentOnBlog
 * @apiGroup BlogsComments Router
 * @apiVersion 1.0.0
 * @apiSuccess {object[]} message comment added successfully
 * @apiHeader (Header) {String} x-auth-token the token of the user loged in
 * @apiError (Error 400) BadRequest Something wrong with the body of the request
 * @apiError (Error 404) BlogNotFound error occur when there is no blog w given id 
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiBody {String} name The name of the user who write the comment
 * @apiBody {String} email The email of the user who write the comment
 * @apiBody {String} content The content of the comment
 * @apiParam {String} id id of the blog
 * @apiSampleRequest http://127.0.0.1:4000/api/blogs/5/comment
 * @apiSuccessExample sample:
 * {
    "message": "comment added successfully"
  }
 */
//post a comment on a blog
router.post("/blogs/:id/comment", auth, blogCommentController.postBlogComment);

/**
 * @api {put} /blogs/:id/comment/:cid PUT/ blogs/:id/comment/:cid
 * @apiName PutCommentOnBlog
 * @apiGroup BlogsComments Router
 * @apiVersion 1.0.0
 * @apiSuccess {String} ok
 * @apiParam {String} id id of the blog
 * @apiParam {String} cid id of the comment
 * @apiHeader (Header) {String} x-auth-token the token of the user loged in
 * @apiError (Error 400) BadRequest Something wrong with the body of the request
 * @apiError (Error 404) BlogOrCommentNotFound error occur when there is no blog w/ given id or comment w/ given id
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiBody {String} name The name of the user who write the comment
 * @apiBody {String} email The email of the user who write the comment
 * @apiBody {String} content The content of the comment
 * @apiSampleRequest http://127.0.0.1:4000/api/blogs/5/comment/1
 * @apiSuccessExample sample:
 *ok
 */
//edit a comment
router.put(
  "/blogs/:id/comment/:cid",
  auth,
  blogCommentController.putBlogComment
);

/**
 * @api {delete} /blogs/:id/comment/:cid Delete/ /blogs/:id/comment/:cid
 * @apiName DeleteComment
 * @apiGroup BlogsComments Router
 * @apiHeader (Header) {String} x-auth-token the token of the user loged in
 * @apiVersion 1.0.0
 * @apiSuccess {object[]} message comment deleted successfully
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiError (Error 404) BlogNotFound error occur when there is no blog w given id 
 * @apiError (Error 404) CommentNotFound error occur when there is no comment w given id 
 * @apiParam {String} id id of the blog
 * @apiParam {String} cid id of the comment*
 *  @apiSampleRequest http://127.0.0.1:4000/api/blogs/5/comment/1
 * @apiSuccessExample sample:
 * {
    "message": "comment deleted successfully"
  }
 */
//delete one comment
router.delete(
  "/blogs/:id/comment/:cid",
  auth,
  blogCommentController.deleteOneComment
);

module.exports = router;
