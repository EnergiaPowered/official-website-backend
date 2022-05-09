import React, { useState, useEffect } from "react";
import "./Headerforsingleblog.css";
import moment from "moment";
import Loader from "shared/Loader";
import { getBlog } from "../../services/comment.services";

function HeaderForSingleBlogs(props) {
  const [blog, setBlog] = useState("");

  useEffect(() => {
    let isMounted = true;
    getBlog(props.id).then((res) => {
      if (isMounted === true) {
        setBlog(res.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const Blogs = () => {
    return (
      <section className="details">
        <img src={blog.image_url} title={blog.title} alt={blog.title} />
        <div className="blog-details">
          <h1 className="blog-cat">{blog.category}</h1>
          <h6 className="blog-author">
            posted by {blog.author} at{" "}
            {moment(new Date(blog.createdAt)).format("DD MMM YYYY")}
          </h6>
          <p className="blog-body">{blog.body}</p>
        </div>
      </section>
    );
  };

  return <div className="blog-container ">{blog ? <Blogs /> : <Loader />}</div>;
}
export default HeaderForSingleBlogs;
