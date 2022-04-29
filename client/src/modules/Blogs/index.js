import React, { useState } from "react";
import { Helmet } from "react-helmet";
import HeaderForBlogs from './components/Header/HeaderForBlogs';
import Layout from './../../shared/Layout/index';
import bg_blogs from "assets/Blogs-header.png";
import BlogList from './components/BlogList/BlogList';
// import { isMouseMoveEvent } from "react-multi-carousel";

function BlogsPage() {

    const style = {
        backgroundImage: `url(${bg_blogs})`,
    };

    return (
        <>
            <div className="page-component" style={style}>
                <Helmet>
                    <title>Energia Powered | Blogs</title>
                </Helmet>
                <Layout>
                    <HeaderForBlogs />
                    <BlogList  /> 
                </Layout>
            </div>
        </>
    )
}
export default BlogsPage