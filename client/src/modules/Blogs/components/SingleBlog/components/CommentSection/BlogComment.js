import React, { useState, useEffect } from "react";
import moment from "moment";
import "./BlogComment.css";
import Loader from "shared/Loader";
import "./../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteComment,
  getBlogComments,
} from "../../services/comment.services";

function BlogComment(props) {
  const [comments, setcomments] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getBlogComments(props.id).then((res) => {
      if (isMounted === true) setcomments(res.data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemove = (id) => {
    deleteComment(props.id, id);
    setcomments(comments.filter((comment) => comment._id !== id));
  };

  const Commentlist = () => {
    if (!comments.length) return null;

    return comments.map((comment) => (
      <div className="comment" key={comment._id}>
        <h4>{comment.name}</h4>
        <span>
          &nbsp;&nbsp;
          {moment(new Date(comment.createdAt)).format("DD/MM/YYYY, hh:mm A")}
        </span>
        <p>{comment.content}</p>
        {comment.email === props.email ? (
          <FontAwesomeIcon
            icon="trash"
            className="remove-icon"
            onClick={() => {
              handleRemove(comment._id);
            }}
          />
        ) : null}
      </div>
    ));
  };

  return (
    <div className="comment-container">
      {comments ? <Commentlist /> : <Loader />}
    </div>
  );
}
export default BlogComment;
