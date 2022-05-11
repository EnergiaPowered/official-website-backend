const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { checkSchema } = require("express-validator");

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

/**
   * @api {get} /blogs GET/ blogs
   * @apiName GetAllBlogs
   * @apiGroup Blogs Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object[]} Blogs A list of all blogs 
   * @apiError (Error 500) internalServerError Error occured during the process from the server 
   * @apiSampleRequest http://127.0.0.1:4000/api/blogs
   * @apiSuccessExample blogs:
   *[
    {
        "image_url": "14BAc44uTMyQ3RZWe2eRe4GGCYZViuHxK",
        "_id": "6091d6622de616519074d7e8",
        "title": "What is HR?",
        "author": "Mennat Allah Mohamed",
        "category": "Human Resources",
        "body": "<blockquote>\r\n<p>&quot;personnel management is essentially &ldquo;workforce&rdquo; centered whereas human resource management is &ldquo;resource&rdquo; centered&quot;</p>\r\n</blockquote>\r\n\r\n<p>A very important question that has been revolving around for many years in our contemporary era. Well, actually it is the most hectic and crucial department in any company/organization, it considers the well-being of both the workforce and the controlling system -whether it falls under the name of organization or company- the importance of it is not just in recruiting, retention and payroll, the HR is more about the employee expectations and the management objectives, how are they met together, is the workflow heading towards the target or not, and those are the critical roles of the essentiality of this department.</p>\r\n\r\n<p>Everything has its start and endpoint, the human resources department in any premises has its own tailored cycle according to the business and market targets, but every cycle should include these five phases which are: Attraction, Recruitment, Onboarding, Development, Retention, and Separation.</p>\r\n\r\n<p>When we talk about the importance of these five phases, it is because an employee who works will definitely talk about the environment of the place he has been in, yes, WORD OF MOUTH, this would cause a big problem for any company that has a bad reputation of attracting qualified people, then not giving them their rightful opportunities of work-life balance, or more development, and so on. As an end note, any HR manager/admin needs to have a very skillful way to choose people and hire them in their suitable positions, regarding soft and technical skills, moreover, tailoring the goals of a firm to be parallel with the qualified workforce that it has.</p>",
        "bodyMobile": "\"personnel management is essentially “workforce” centered whereas human resource management is “resource” centered\"\r\n\r\nA very important question that has been revolving around for many years in our contemporary era. Well, actually it is the most hectic and crucial department in any company/organization, it considers the well-being of both the workforce and the controlling system -whether it falls under the name of organization or company- the importance of it is not just in recruiting, retention and payroll, the HR is more about the employee expectations and the management objectives, how are they met together, is the workflow heading towards the target or not, and those are the critical roles of the essentiality of this department.\r\n\r\nEverything has its start and endpoint, the human resources department in any premises has its own tailored cycle according to the business and market targets, but every cycle should include these five phases which are: Attraction, Recruitment, Onboarding, Development, Retention, and Separation.\r\n\r\nWhen we talk about the importance of these five phases, it is because an employee who works will definitely talk about the environment of the place he has been in, yes, WORD OF MOUTH, this would cause a big problem for any company that has a bad reputation of attracting qualified people, then not giving them their rightful opportunities of work-life balance, or more development, and so on. As an end note, any HR manager/admin needs to have a very skillful way to choose people and hire them in their suitable positions, regarding soft and technical skills, moreover, tailoring the goals of a firm to be parallel with the qualified workforce that it has.",
        "createdAt": "2021-02-22T16:15:47.273Z",
        "updatedAt": "2021-02-22T16:15:47.273Z",
        "__v": 0
    },
    {
        "image_url": "14BIxDGW5ZVGqR1elTjsegdx6N9SpCAq4",
        "_id": "6091d7812de616519074d7ea",
        "title": "About C++",
        "author": "Shaimaa Osama",
        "category": "C++",
        "body": "<p><strong>What is C++?</strong></p>\r\n\r\n<ul>\r\n\t<li>C++ is a cross-platform language that can be used to create high-performance applications.</li>\r\n\t<li>C++ was developed by Bjarne Stroustrup, as an extension to the C language.</li>\r\n\t<li>C++ gives programmers a high level of control over system resources and memory.</li>\r\n\t<li>The language was updated 3 major times in 2011, 2014, and 2017 to C++11, C++14, and C++17.</li>\r\n</ul>\r\n\r\n<p><strong>Why Use C++?</strong></p>\r\n\r\n<ul>\r\n\t<li>C++ is one of the world&#39;s most popular programming languages.</li>\r\n\t<li>C++ can be found in today&#39;s operating systems, Graphical User Interfaces, and embedded systems.</li>\r\n\t<li>C++ is an object-oriented programming language that gives a clear structure to programs and allows code to be reused, lowering development costs.</li>\r\n\t<li>C++ is portable and can be used to develop applications that can be adapted to multiple platforms.</li>\r\n\t<li>C++ is fun and easy to learn!</li>\r\n\t<li>As C++ is close to C# and Java, it makes it easy for programmers to switch to C++ or vice versa</li>\r\n</ul>\r\n\r\n<p><strong>Where can you learn C++?</strong><br />\r\nYou can try this course from Udacity:&nbsp;<a href=\"https://www.udacity.com/course/c-for-programmers--ud210\" target=\"_blank\">Click here</a></p>",
        "bodyMobile": "What is C++?\r\n-  C++ is a cross-platform language that can be used to create high-performance applications.\r\n- C++ was developed by Bjarne Stroustrup, as an extension to the C language.\r\n- C++ gives programmers a high level of control over system resources and memory.\r\n- The language was updated 3 major times in 2011, 2014, and 2017 to C++11, C++14, and C++17.\r\n\r\nWhy Use C++?\r\n- C++ is one of the world's most popular programming languages.\r\n- C++ can be found in today's operating systems, Graphical User Interfaces, and embedded systems.\r\n- C++ is an object-oriented programming language that gives a clear structure to programs and allows code to be reused, lowering development costs.\r\n- C++ is portable and can be used to develop applications that can be adapted to multiple platforms.\r\n- C++ is fun and easy to learn!\r\n- As C++ is close to C# and Java, it makes it easy for programmers to switch to C++ or vice versa\r\n\r\nWhere can you learn C++?\r\nYou can try this course from Udacity: www.udacity.com/course/c-for-programmers--ud210",
        "createdAt": "2021-02-19T14:44:39.132Z",
        "updatedAt": "2021-02-19T14:44:39.132Z",
        "__v": 0
    },
    {
        "image_url": "14BCwNFkZgqFMkDdCtfIh-xLkxbXj6qzz",
        "_id": "6091d7ff2de616519074d7eb",
        "title": "Introduction to embedded systems and IOT",
        "author": "Sara Adel",
        "category": "Embedded Systems",
        "body": "<p>Due to the great development in the world currently in all things and the attempt to convert everything to automatic, this explains the spread of the field of embedded systems, it is a mixture of computer hardware and software designed for a specific function and can also work within a larger system.</p>\r\n\r\n<p>While embedded systems are computing systems, they can range from lack of a user interface (UI) - for example, on devices designed to perform a single task - to complex graphical user interfaces (GUI), as in mobile devices. User interfaces can include buttons, LEDs (light-emitting diodes), and a touch screen sensor. Some systems also use remote user interfaces.</p>\r\n\r\n<p>Also, due to the use of the Internet in everything now in our life, the field of the Internet of Things has become one of the most important areas of the future.</p>\r\n\r\n<p>It has enabled the Internet of Things (IoT), which is a major force in digital transformation, through the increasingly powerful computing offered over shrinking containers, pervasive connectivity, and rapid advances in applied analytics and artificial intelligence (AI). However, the value of the Internet of Things does not come easily.</p>\r\n\r\n<p>To succeed, organizations must have highly sophisticated data and analytics practices, robust operational technologies, smart technology parts, as well as the ability to navigate change and manage risk.</p>",
        "bodyMobile": "Due to the great development in the world currently in all things and the attempt to convert everything to automatic, this explains the spread of the field of embedded systems, it is a mixture of computer hardware and software designed for a specific function and can also work within a larger system.\r\n\r\nWhile embedded systems are computing systems, they can range from lack of a user interface (UI) - for example, on devices designed to perform a single task - to complex graphical user interfaces (GUI), as in mobile devices. User interfaces can include buttons, LEDs (light-emitting diodes), and a touch screen sensor. Some systems also use remote user interfaces.\r\n\r\nAlso, due to the use of the Internet in everything now in our life, the field of the Internet of Things has become one of the most important areas of the future.\r\n\r\nIt has enabled the Internet of Things (IoT), which is a major force in digital transformation, through the increasingly powerful computing offered over shrinking containers, pervasive connectivity, and rapid advances in applied analytics and artificial intelligence (AI). However, the value of the Internet of Things does not come easily.\r\n\r\nTo succeed, organizations must have highly sophisticated data and analytics practices, robust operational technologies, smart technology parts, as well as the ability to navigate change and manage risk.",
        "createdAt": "2021-02-19T14:28:56.316Z",
        "updatedAt": "2021-02-19T14:28:56.316Z",
        "__v": 0
    }
]
*/
// Retrieve all blogs
router.get("/blogs", blogController.getBlogs);

/**
   * @api {get} /blogs/:id GET/ blogs/:id
   * @apiName GetSingleBlog
   * @apiParam {string} id id of the blog
   * @apiGroup Blogs Router
   * @apiVersion 1.0.0
   * @apiSuccess {Object} Blog The blog object
   * @apiError (Error 500) internalServerError Error occured during the process from the server 
   * @apiSampleRequest http://localhost:4000/api/blogs/621257c401e1804c28b388a1
   * @apiSuccessExample blog:
   *{
    "image_url": "image_url",
    "_id": "621257c401e1804c28b388a1",
    "title": "title",
    "author": "author",
    "category": "Web Development",
    "body": "body",
    "bodyMobile": "bodyMobile",
    "createdAt": "2022-02-20T15:01:24.110Z",
    "updatedAt": "2022-02-20T15:01:24.110Z",
    "__v": 0
}
*/
// Retrieve single blog by id

router.get("/blogs/:id", blogController.getSingleBlog);

/**
 * @api {post} /blogs POST/ blogs
 * @apiName PostBlog
 * @apiGroup Blogs Router
 * @apiVersion 1.0.0
 * @apiSuccess {String} ok
 * @apiError (Error 400) BadRequest Something wrong with the body of the request
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiBody {String} title The title of the blog
 * @apiBody {String} body The body of the blog
 * @apiBody {String} bodyMobile The body of the blog in mobiles
 * @apiBody {String} author The author of the blog
 * @apiBody {String} category The category of the blog
 * @apiBody {String} image_url The image of the blog
 * @apiSampleRequest http://127.0.0.1:4000/api/blogs
 * @apiSuccessExample sample:
 * ok
 */

// insert new blog w/ validation and sanitization
router.post(
  "/blogs",
  [auth, admin, blogCheckSchema],
  blogController.postBlog
);

/**
 * @api {put} /blogs/:id PUT/ blogs/:id
 * @apiName PutBlog
 * @apiGroup Blogs Router
 * @apiVersion 1.0.0
 * @apiSuccess {String} ok
 * @apiParam {string} id id of the blog
 * @apiError (Error 400) valdiationError Something wrong with the body of the request
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiError (Error 404) UserNotFound Error occures if the user was deleted from the database
 * @apiBody {String} title The title of the blog
 * @apiBody {String} body The body of the blog
 * @apiBody {String} bodyMobile The body of the blog in mobiles
 * @apiBody {String} author The author of the blog
 * @apiBody {String} category The category of the blog
 * @apiBody {String} image_url The image of the blog
 * @apiSampleRequest http://127.0.0.1:4000/api/blogs/621257c401e1804c28b388e6
 * @apiSuccessExample sample:
 * ok
 */

// edit a blog w/ validation and sanitization
router.put(
  "/blogs/:id",
  [auth, admin, blogCheckSchema],
  blogController.putBlog
);

/**
 * @api {delete} /blogs/:id Delete/ blogs/:id
 * @apiName DeleteBlog
 * @apiGroup Blogs Router
 * @apiHeader (Header) {String} x-auth-token the token when the needed for admin
 * @apiVersion 1.0.0
 * @apiParam {string} id id of the blog
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiError (Error 404) UserNotFound Error occures if the user was deleted from the database
 * @apiSampleRequest http://127.0.0.1:4000/api/blogs
 */
// delete a blog
router.delete("/blogs/:id", [auth, admin], blogController.deleteOneBlog);

/**
 * @api {delete} /blogs Delete/ blogs
 * @apiName DeleteBlog
 * @apiGroup Blogs Router
 * @apiHeader (Header) {String} x-auth-token the token when the needed for admin
 * @apiVersion 1.0.0
 * @apiError (Error 500) internalServerError Error occured during the process from the server
 * @apiSampleRequest http://127.0.0.1:4000/api/blogs
 */
// delete all blogs
router.delete("/blogs", [auth, admin], blogController.deleteAllBlogs);

module.exports = router;
