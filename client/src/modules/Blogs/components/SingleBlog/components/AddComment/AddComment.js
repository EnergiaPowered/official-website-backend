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
        setNewComment(null);
      }
    });
  };

  return (
    <div className="addcomment">
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
        <div className="form-group">
          <button className="btn">Post Comment</button>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
