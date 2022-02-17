import React, { useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

  function importAllImages(r) {
    return r.keys().map(r);
  }

  const [partners] = useState(importAllImages(require.context('../../images', false, /\.(png|jpe?g|svg)$/)));

  return (
    <section id="Partners" className="bg-section dark-bg component-font">
      <div className="container">
        <h2 className="section-title">Past partners & sponsors </h2>

        <Carousel responsive={responsive} infinite={true}>
          {partners.slice(0, partners.length / 2).map((partner, idx) => {
            return (
              <article className="partner-carousel-item" key={idx}>
                <section className="partner-logo">
                  <img
                    src={partner}
                    alt="partner-logo"
                    width={200}
                  />
                </section>

                <p className="partner-name"> {partner.split("/")[3].split(".")[0]} </p>
              </article>
            );
          })}
        </Carousel>

        <Carousel responsive={responsive} infinite={true}>
          {partners.slice(partners.length / 2).map((partner, idx) => {
            return (
              <article className="partner-carousel-item" key={idx}>
                <section className="partner-logo">
                  <img
                    src={partner}
                    alt="partner-logo"
                    width={200}
                  />
                </section>

                <p className="partner-name"> {partner.split("/")[3].split(".")[0]} </p>
              </article>
            );
          })}
        </Carousel>

      </div>
    </section>
  );
};
