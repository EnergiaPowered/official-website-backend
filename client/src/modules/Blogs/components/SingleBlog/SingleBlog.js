import React from "react";
import blogBG from "assets/Blog-background.png";
import "./SingleBlog.css";

function SingleBlog({ isBlogOpened, setIsBlogOpened, clickedBlog }) {
    const getDate = (date) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    return (
        <>
            {isBlogOpened ? (
                <div className="singleBlog__container">
                    <article className="singleBlogcard">
                        <img src={blogBG} alt="Single Blog Container" />
                        <div className="singleBlogcard__content">
                            <i
                                className="fas fa-times-circle"
                                onClick={() => setIsBlogOpened(false)}
                            ></i>
                            <h3 className="blogcard__heading">{clickedBlog.title}</h3>
                            <div className="blogcard__body">
                                <h6 className="mb-0" style={{ color: "#010e30", fontWeight: "bold" }}>{clickedBlog.category}</h6>
                                <small className="text-muted"><em>{getDate(new Date(clickedBlog.createdAt))}</em></small>
                                <p dangerouslySetInnerHTML={{ __html: clickedBlog.body }}></p>
                                <h5 style={{ color: "#010e30", textAlign: "left" }}>{clickedBlog.author}</h5>
                            </div>
                        </div>
                    </article>
                </div>
            ) : null}
        </>
    );
}
export default SingleBlog;
