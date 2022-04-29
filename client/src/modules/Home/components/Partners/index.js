import React, { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { getPartners } from "./services/partners.services";

import "./style.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    getPartners().then(res => {
      const mainPartners = res.data.filter(partner => partner.isMain);
      setPartners(mainPartners);
    })
  }, []);

  return (
    <section id="Partners" className="bg-section dark-bg component-font">
      <div className="container">
        <h2 className="section-title" style={{marginBottom: "20px"}}>Past partners & sponsors </h2>
        <p style={{marginBottom: "50px", fontSize: "1.6vw"}}>See all of our partners & sponsors from <Link to="/sponsors">here</Link></p>

        <Carousel responsive={responsive} infinite={true}>
          {partners.slice(0, partners.length / 2).map((partner) => {
            return (
              <article className="partner-carousel-item" key={partner._id}>
                <section className="partner-logo">
                  <img
                    src={partner.image}
                    alt="partner-logo"
                    width={200}
                  />
                </section>

                <p className="partner-name"> {partner.name} </p>
              </article>
            );
          })}
        </Carousel>

        <Carousel responsive={responsive} infinite={true}>
          {partners.slice(partners.length / 2).map((partner) => {
            return (
              <article className="partner-carousel-item" key={partner._id}>
                <section className="partner-logo">
                  <img
                    src={partner.image}
                    alt="partner-logo"
                    width={200}
                  />
                </section>

                <p className="partner-name"> {partner.name} </p>
              </article>
            );
          })}
        </Carousel>

      </div>
    </section>
  );
};
