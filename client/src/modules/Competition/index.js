import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from "shared/Navbar";
import Footer from "shared/Footer";

import "./style.css";

import bg from "assets/single-comm-header.png";
import competitionInfo from "./services/competition.services";

export default function Competition() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let style = {
    backgroundImage: `url(${bg})`,
  };

  return (
    <>
      <Helmet>
        <title>Energia Powered | Embedded Systems Competition</title>
      </Helmet>
      <Navbar />
      <article className="page-component" id="Competition" style={style}>
        <header className="header-section">
          <h1 data-testid="comm-title">Embedded Systems Competition</h1>
          <div id="comm-icon">
            <FontAwesomeIcon icon="network-wired" />
          </div>
        </header>

        <main>
          <div className="container">
            <section className="bg-section component-font">
              <h1 className="section-title">About Event</h1>
              <div className="row">
                <div className="side-container col-12 col-md-3">
                  <p className="about-event-number">01</p>
                  <p className="about-event-text">What is this competition?</p>
                </div>
                <div className="col-12 col-md-9">
                  <h3 className="about-event-header">Description</h3>
                  <p>{competitionInfo.desc}</p>
                </div>
              </div>

              <br />
              <br />

              <div className="row">
                <div className="side-container col-12 col-md-3">
                  <p className="about-event-number">02</p>
                  <p className="about-event-text">Why hold this event?</p>
                </div>
                <div className="col-12 col-md-9">
                  <h3 className="about-event-header">Objectives</h3>
                  <p>{competitionInfo.objectives}</p>
                </div>
              </div>

              <br />
              <br />

              <div className="row">
                <div className="side-container col-12 col-md-3">
                  <p className="about-event-number">03</p>
                  <p className="about-event-text">For whom?</p>
                </div>
                <div className="col-12 col-md-9">
                  <h3 className="about-event-header">Target Audience</h3>
                  <div>
                    {competitionInfo.target.map((target, idx) => (
                      <p key={target}>
                        <span className="number">{idx + 1}</span> {target}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <br />
              <br />

              <div className="row">
                <div className="side-container col-12 col-md-3">
                  <p className="about-event-number">04</p>
                  <p className="about-event-text">When?</p>
                </div>
                <div className="col-12 col-md-9">
                  <h3 className="about-event-header">Duration</h3>
                  <p>{competitionInfo.duration}</p>
                </div>
              </div>
            </section>

            <hr />

            <section className="bg-section component-font">
              <h1 className="section-title">Event Process</h1>
              {competitionInfo.process.map((process, index) => (
                <div key={process.title}>
                  <div className="row">
                    <div className="side-container process col-12 col-md-1">
                      <p>0{index + 1}</p>
                    </div>
                    <div className="col-12 col-md-11">
                      <h3>{process.title}</h3>
                      {"desc" in process ? (
                        <p>{process.desc}</p>
                      ) : (
                        <>
                          <p style={{ fontSize: "1.5rem" }}>{process.brief}</p>
                          {process.list.map((item, idx) => (
                            <p key={item}>
                              <span className="number">{idx + 1}</span> {item}
                            </p>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
              ))}
            </section>
          </div>
        </main>

        <div className="border-up">
          <Footer />
        </div>
      </article>
    </>
  );
}
