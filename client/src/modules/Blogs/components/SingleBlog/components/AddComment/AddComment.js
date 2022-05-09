import React, { useState } from "react";
import "./AddComment.css";
import "bootstrap/dist/css/bootstrap.css";
import "./../../index.css";
import { postComment } from "../../services/comment.services";
function AddComment(props) {
  const [Newcomment, setNewcomment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(props.id, props.name, props.email, Newcomment).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="addcomment">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Leave a comment</label>
          <textarea
            value={Newcomment}
            className="form-control"
            onChange={(e) => setNewcomment(e.target.value)}
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
