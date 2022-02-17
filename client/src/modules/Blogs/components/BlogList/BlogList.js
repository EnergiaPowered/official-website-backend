import React, { useState, useEffect } from "react";
import { getBlogs } from "../../services/blogs.services";
import Loader from "shared/Loader";
import blogBG from "assets/Blog-background.png";
import "./BlogList.css";

function BlogList({ setIsBlogOpened, setClickedBlog }) {
    const [blogList, setBlogsList] = useState(null);

    const getDate = (date) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const Blogs = () =>
        blogList.map((blog) => {
            return (
                <article
                    className="blogcard col-12 col-md-6 col-lg-4"
                    key={blog._id}
                >
                    <img src={blogBG} alt="Blog Container" />
                    <div className="blogcard__content">
                        <h3 className="blogcard__heading">{blog.title}</h3>
                        <div className="blogcard__body">
                            <h6
                                className="mb-0"
                                style={{ color: "#010e30", fontWeight: "bold" }}
                            >
                                {blog.category}
                            </h6>
                            <small className="text-muted">
                                <em>{getDate(new Date(blog.createdAt))}</em>
                            </small>
                            <p
                                dangerouslySetInnerHTML={{ __html: blog.body }}
                            ></p>
                        </div>
                        <div
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Click to see the full blog"
                            onClick={() => {
                                setIsBlogOpened(true);
                                setClickedBlog(blog);
                            }}
                        >
                            See more
                        </div>
                    </div>
                </article>
            );
        });

    useEffect(() => {
        getBlogs().then((res) => {
            setBlogsList(res.data)
        });
    }, []);

    return (
        <div data-testid="bloglist" className="container blogs-container row">
            {blogList && blogList.length ? <Blogs /> : <Loader />}
        </div>
    );
}
export default BlogList;
