import React from "react";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Particles from "react-particles-js";

import "./style.css";

export default () => {
  return (
    <div className="found-container page-component">
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Particles
        height="100%"
        className="particles"
        params={{
          particles: {
            line_linked: {
              color: "#FFFFFF"
            },
            number: {
              value: 80
            },
            size: {
              value: 2
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse"
              },
              onresize: {
                enable: true,
                density_auto: true,
                density_area: 100
              }
            }
          }
        }}
      />

      <section className="text-center found-content">
        <div className="found-children">
          <h1 className="section-title found-title"> Oops! </h1>
          <p>The page you're looking for is Not Found</p>

          <Link to="/"> Back to home </Link>
        </div>
      </section>
    </div>
  );
};
