import React, { useState, useEffect } from "react";
import { getBlogs } from "../../services/blogs.services";
import moment from "moment";
import Loader from "shared/Loader";
import "./BlogList.css";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogList, setBlogsList] = useState(null);
  useEffect(() => {
    getBlogs().then((res) => {
      setBlogsList(res.data);
    });
  }, []);

  const Blogs = () =>
    blogList.map((blog) => {
      return (
        <article className="blogcard col-12 col-md-6 col-lg-4" key={blog._id}>
          <Link to={"/blogs/" + blog._id}>
            <div className="blogcard__content">
              <div className="img-container">
                <img src={blog.image_url} alt="blog" title={blog.title} />
              </div>
              <div className="blogcard__body">
                <h3 className="blogcard__heading">{blog.title}</h3>

                <h5
                  className="mb-0"
                  style={{ color: "#010e30", fontWeight: "bold" }}
                >
                  {blog.category}
                </h5>
                <small className="text-muted">
                  <em>
                    {moment(new Date(blog.createdAt)).format("DD MMM YYYY")}
                  </em>
                </small>
              </div>
            </div>
          </Link>
        </article>
      );
    });

  return (
    <div data-testid="bloglist" className="container blogs-container row">
      {blogList && blogList.length ? <Blogs /> : <Loader />}
    </div>
  );
}
export default BlogList;
