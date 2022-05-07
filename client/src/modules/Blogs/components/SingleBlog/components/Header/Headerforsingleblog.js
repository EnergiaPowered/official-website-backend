import React, { useState, useEffect } from "react";
import "./Headerforsingleblog.css";
import axios from "axios";
import configs from "globals/config";
import Loader from "shared/Loader";

function HeaderForSingleBlogs(props) {
  const [blog, setBlog] = useState("");

  useEffect(() => {
    const getBlogs = () => axios.get(`${configs.HOST}blogs/` + props.id);

    getBlogs().then((res) => setBlog(res.data));
  }, [props.id]);

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

  const Blogs = () => {
    return (
      <section className="details">
        <img src={blog.image_url} title={blog.title} alt={blog.title} />
        <div className="blog-details">
          <h1 className="blog-cat">{blog.category}</h1>
          <h6 className="blog-author">
            posted by {blog.author} at {getDate(new Date(blog.createdAt))}
          </h6>
          <p className="blog-body">{blog.body}</p>
        </div>
      </section>
    );
  };

  return <div className="blog-container ">{blog ? <Blogs /> : <Loader />}</div>;
}
export default HeaderForSingleBlogs;
