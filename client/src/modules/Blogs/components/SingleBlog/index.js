import React from "react";
import { Helmet } from "react-helmet";
import HeaderForSingleBlogs from "./components/Header/Headerforsingleblog";
import Layout from "shared/Layout/index";
import bg_blogs from "assets/Blogs-header.png";
import BlogComment from "./components/CommentSection/BlogComment";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

function SingleBlog() {
  const style = {
    backgroundImage: `url(${bg_blogs})`,
  };
  let { id } = useParams();

  return (
    <>
      <div className="page-component" style={style}>
        <Helmet>
          <title>Energia Powered | Blogs</title>
        </Helmet>
        <Layout>
          <div className="page-container">
            <HeaderForSingleBlogs id={id} />
            <BlogComment id={id} />
          </div>
        </Layout>
      </div>
    </>
  );
}
export default SingleBlog;
