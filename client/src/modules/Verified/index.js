import React from "react";

import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import Particles from "react-particles-js";

import "./style.css";

export default () => {
  const isVerified = document.cookie.indexOf("verified") !== -1 ? true : false;
  if (!isVerified) return <Redirect to="/" />;
  return (
    <div className="found-container page-component">
      <Helmet>
        <title>Energia Powered | User Verified</title>
      </Helmet>
      <Particles
        height="100%"
        className="particles"
        params={{
          particles: {
            line_linked: {
              color: "#FFFFFF",
            },
            number: {
              value: 80,
            },
            size: {
              value: 2,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onresize: {
                enable: true,
                density_auto: true,
                density_area: 100,
              },
            },
          },
        }}
      />

      <section className="text-center found-content">
        <div className="found-children">
          <h1 className="section-title found-title"> Congrats! </h1>
          <p>Your email has been verified successfully</p>

          <Link to="/login"> Please login </Link>
        </div>
      </section>
    </div>
  );
};
