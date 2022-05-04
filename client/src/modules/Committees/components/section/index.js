import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCommittees } from "../../services/committees.services";
import Loader from "shared/Loader";
import Carousel from "react-multi-carousel";
import "./style.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Committees() {
  const [committees, setCommittees] = useState(null);

  useEffect(() => {
    getCommittees().then((res) => setCommittees(res.data));
  }, []);

  return (
    <>
      {committees ? (
        <div id="Committees" className="component-font">
          <h2 className="section-title"> Our Committees </h2>
          <Carousel responsive={responsive} infinite={true}>
            {committees.map((el, idx) => (
              <div className="committee-carousel-item" key={idx}>
                <div className="icon-container">
                  <Link
                    to={`/committee/${el.title.toLowerCase()}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {/* <FontAwesomeIcon icon={el.icon_class} className="icon" /> */}
                    <img src={el.image} alt="committee icon" className="icon" />
                  </Link>
                </div>
                <Link
                  to={`/committee/${el.title.toLowerCase()}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <p className="committee-label">{el.title}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
