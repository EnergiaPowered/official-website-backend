import React, { useState } from "react";
import { Helmet } from "react-helmet";
import HeaderForBlogs from './components/Header/HeaderForBlogs';
import Layout from './../../shared/Layout/index';
import bg_blogs from "assets/Blogs-header.png";
import BlogList from './components/BlogList/BlogList';
import SingleBlog from "./components/SingleBlog/SingleBlog";
// import { isMouseMoveEvent } from "react-multi-carousel";

function BlogsPage() {
    const [clickedBlog, setClickedBlog] = useState(null);
    const [isBlogOpened, setIsBlogOpened] = useState(false);

    const style = {
        backgroundImage: `url(${bg_blogs})`,
    };

    document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") setIsBlogOpened(false);
    });

    return (
        <>
            <div className="page-component" style={style}>
                <Helmet>
                    <title>Energia Powered | Blogs</title>
                </Helmet>
                <Layout>
                    <HeaderForBlogs />
                    <BlogList setIsBlogOpened={setIsBlogOpened} setClickedBlog={setClickedBlog} />
                    <SingleBlog isBlogOpened={isBlogOpened} setIsBlogOpened={setIsBlogOpened} clickedBlog={clickedBlog} />
                </Layout>
            </div>
        </>
    )
}
export default BlogsPage