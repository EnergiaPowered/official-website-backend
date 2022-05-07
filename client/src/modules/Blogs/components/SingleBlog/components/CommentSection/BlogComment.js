import React, { useState, useEffect } from "react";
import "./BlogComment.css";
import axios from "axios";
import configs from "globals/config";
import Loader from "shared/Loader";

function BlogComment(props) {
  const [comments, setcomments] = useState(null);

  useEffect(() => {
    const getBlogs = () =>
      axios.get(`${configs.HOST}blogs/` + props.id + `/comments`);

    getBlogs().then((res) => setcomments(res.data));
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

  const Commentlist = () =>
    comments.map((comment) => {
      return (
        <div className="col-sm-5 col-md-6 col-12 comment text-justify">
          <h4>{comment.name}</h4>
          <span>- {getDate(new Date(comment.createdAt))}</span>
          <p>{comment.content}</p>
        </div>
      );
    });

  return (
    <div className="comment-container">
      {comments ? <Commentlist /> : <Loader />}
    </div>
  );
}
export default BlogComment;
