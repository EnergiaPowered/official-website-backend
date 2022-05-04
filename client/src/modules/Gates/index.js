import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "shared/Layout";
import "./style.css";

import bg from "assets/single-comm-header.png";
import gatesInfo from "./services/gates.services";

export default () => {
  const style = {
    backgroundImage: `url(${bg})`,
  };

  return (
    <div className="page-component" id="gates" style={style}>
      <Helmet>
        <title>Energia Powered | Gates</title>
      </Helmet>
      <Layout>
        <header className="header-section">
          <h1>Energia Powered Gates</h1>
          <div id="gates-icon">
            <FontAwesomeIcon icon="door-open" />
          </div>
        </header>
        <main>
          <div className="container">
            <section className="bg-section component-font">
              <h1 className="section-title">Event Process</h1>
              {gatesInfo.map(({ title, desc }, index) => (
                <div key={title}>
                  <div className="row">
                    <div className="side-container col-12 col-md-1">
                      <p>0{index + 1}</p>
                    </div>
                    <div className="col-12 col-md-10 p-0">
                      <h3>{title}</h3>
                      <p style={{ whiteSpace: "pre-line" }}>{desc}</p>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
              ))}
            </section>
          </div>
        </main>
      </Layout>
    </div>
  );
};
