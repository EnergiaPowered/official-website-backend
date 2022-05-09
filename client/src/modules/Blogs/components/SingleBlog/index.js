import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import HeaderForSingleBlogs from "./components/Header/Headerforsingleblog";
import Layout from "shared/Layout";
import BlogComment from "./components/CommentSection/BlogComment";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import AddComment from "./components/AddComment/AddComment";
import "./index.css";
import { getUserdata } from "./services/comment.services";

import authHeader from "globals/auth-header";
import Loader from "shared/Loader";
function SingleBlog() {
  const [Userdata, setUserdata] = useState(null);
  const [Loading, setLoading] = useState(false);
  const loggedIn = Object.keys(authHeader()).length ? true : false;

  let { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    if (loggedIn) {
      setLoading(true);

      getUserdata().then((res) => {
        if (isMounted === true) {
          setUserdata(res.data);
          setLoading(false);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const Commentpage = () => {
    if (!Userdata && loggedIn) return null;
    return (
      <>
        <Helmet>
          <title>Energia Powered | Blogs</title>
        </Helmet>
        <Layout>
          <div className="page-container">
            <HeaderForSingleBlogs id={id} />
            <div className="comment-section">
              <BlogComment id={id} email={loggedIn ? Userdata.email : null} />
              {loggedIn ? (
                <AddComment
                  id={id}
                  name={
                    loggedIn
                      ? Userdata.firstname + " " + Userdata.lastname
                      : null
                  }
                  email={loggedIn ? Userdata.email : null}
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
      {Loading ? <Loader /> : <Commentpage />}
    </div>
  );
}
export default SingleBlog;
