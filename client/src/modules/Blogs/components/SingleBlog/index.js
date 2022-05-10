import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import HeaderForSingleBlogs from "./components/Header/Headerforsingleblog";
import Layout from "shared/Layout";
import BlogComment from "./components/CommentSection/BlogComment";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import AddComment from "./components/AddComment/AddComment";
import "./index.css";
import {
  getBlog,
  getBlogComments,
  getUserData,
} from "./services/comment.services";

import authHeader from "globals/auth-header";
import Loader from "shared/Loader";
function SingleBlog() {
  const [UserData, setUserData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogComments, setBlogComments] = useState([]);

  const loggedIn = Object.keys(authHeader()).length ? true : false;

  let { id } = useParams();

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);

      getUserData()
        .then((res) => {
          setUserData(res.data);
          return getBlog(id);
        })
        .then((res) => {
          setBlog(res.data);
          return getBlogComments(id);
        })
        .then((res) => {
          setBlogComments(res.data);
          setLoading(false);
        });
    }
  }, [loggedIn, id]);

  const CommentPage = () => {
    if (!UserData && loggedIn) return null;
    if (Loading) return <Loader />;
    return (
      <>
        <Helmet>
          <title>Energia Powered | Blogs</title>
        </Helmet>
        <Layout>
          <div className="page-container">
            <HeaderForSingleBlogs id={id} blog={blog} setBlog={setBlog} />
            <div className="comment-section">
              <BlogComment
                id={id}
                email={loggedIn ? UserData.email : null}
                blogComments={blogComments}
                setBlogComments={setBlogComments}
              />
              {loggedIn ? (
                <AddComment
                  id={id}
                  name={
                    loggedIn
                      ? UserData.firstname + " " + UserData.lastname
                      : null
                  }
                  email={loggedIn ? UserData.email : null}
                  blogComments={blogComments}
                  setBlogComments={setBlogComments}
                />
              ) : null}
            </div>
          </div>
        </Layout>
      </>
    );
  };

  return (
    <div className="page-component">
      {Loading ? <Loader /> : <CommentPage />}
    </div>
  );
}
export default SingleBlog;
