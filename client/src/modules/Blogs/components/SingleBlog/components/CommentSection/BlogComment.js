import React from "react";
import moment from "moment";
import "./BlogComment.css";
import Loader from "shared/Loader";
import "./../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteComment } from "../../services/comment.services";

function BlogComment({ id, email, blogComments, setBlogComments }) {
  // useEffect(() => {
  //   getBlogComments(id).then((res) => {
  //     setBlogComments(res.data);
  //   });
  // }, [id, setBlogComments]);

  const handleRemove = (idToRemove) => {
    deleteComment(id, idToRemove).then((res) => {
      if (res.status === 200) {
        setBlogComments(
          blogComments.filter((comment) => comment._id !== idToRemove)
        );
      }
    });
  };

  const CommentList = () => {
    return blogComments.map((comment) => (
      <div className="comment" key={comment._id}>
        <h4>{comment.name}</h4>
        <span>
          &nbsp;&nbsp;
          {moment(new Date(comment.createdAt)).format("DD/MM/YYYY, hh:mm A")}
        </span>
        <p>{comment.content}</p>
        {comment.email === email ? (
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
      {blogComments?.length ? <CommentList /> : <Loader />}
    </div>
  );
}
export default BlogComment;
