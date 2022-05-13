import React, { useState } from "react";
import "./AddComment.css";
import "bootstrap/dist/css/bootstrap.css";
import "./../../index.css";
import { postComment } from "../../services/comment.services";

function AddComment({ id, blogComments, setBlogComments }) {
  const [NewComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(id, NewComment).then((res) => {
      if (res.status === 201) {
        const newComments = [
          { ...res.data.comment, createdAt: new Date() },
          ...blogComments,
        ];
        console.log(newComments);
        setBlogComments(newComments);
        setNewComment("");
      }
    });
  };

  return (
    <div className="addcomment col-12 col-md-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Leave a comment</label>
          <textarea
            value={NewComment}
            className="form-control"
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
        </div>
        <button className="btn">Post Comment</button>
      </form>
    </div>
  );
}

export default AddComment;
