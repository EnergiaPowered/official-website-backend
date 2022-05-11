import React from "react";
import "./Headerforsingleblog.css";
import moment from "moment";
import Loader from "shared/Loader";

function HeaderForSingleBlogs({ blog }) {
  const Blogs = () => {
    return (
      <section className="details row">
        <h1 className="blog-title col-12">{blog.title}</h1>
        <div className="blog-details col-12 col-md-7">
          <h3 className="blog-cat">{blog.category}</h3>
          <h6 className="blog-author">
            posted by {blog.author} at{" "}
            {moment(new Date(blog.createdAt)).format("DD MMM YYYY")}
          </h6>
          <p className="blog-body">{blog.body}</p>
        </div>
        <img
          src={blog.image_url}
          className="col-12 col-md-5"
          title={blog.title}
          alt={blog.title}
        />
      </section>
    );
  };

  return <div className="blog-container ">{blog ? <Blogs /> : <Loader />}</div>;
}
export default HeaderForSingleBlogs;
