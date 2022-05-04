import React, { useState, useEffect } from "react";
import { getBlogs } from "../../services/blogs.services";
import Loader from "shared/Loader";
import "./BlogList.css";

function BlogList() {
  const [blogList, setBlogsList] = useState(null);

  useEffect(() => {
    getBlogs().then((res) => {
      setBlogsList(res.data);
    });
  }, []);

  const handleclick = () => {
    //to be edited when singe blogs added
  };

  const getDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const Blogs = () =>
    blogList.map((blog) => {
      return (
        <article className="blogcard col-12 col-md-6 col-lg-4" key={blog._id}>
          <div className="blogcard__content" onClick={handleclick}>
            <h3 className="blogcard__heading">{blog.title}</h3>
            {/* <img
                            src={blog.image_url}
                            alt="blog"
                            title={blog.title}
                        /> */}
            <div className="blogcard__body">
              <h5
                className="mb-0"
                style={{ color: "#010e30", fontWeight: "bold" }}
              >
                {blog.category}
              </h5>
              <small className="text-muted">
                <em>{getDate(new Date(blog.createdAt))}</em>
              </small>
            </div>
          </div>
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
