import React from "react";

// css
import "./style.css";

// assets
import supervisor from "assets/supervisor.jpg";

export default () => {
  return (
    <section className="container bg-section component-font" id="supervisor">
      <h2 className="section-title text-center"> our supervisor </h2>

      <main className="row">
        <section className="col-md-6 col-sm-12">
          <p className="sup-name">DR. Samah Elshafiey</p>
          <p className="sup-univ"> Faculty of Engineering, Cairo University </p>

          <p className="sup-job">
            Assistant Professor, Engineering Mathematics and Physics Department
            Co-Director, Technical Center for Career Development{" "}
          </p>
        </section>
        <section className="col-md-6 col-sm-12">
          <img
            src={supervisor}
            alt="Doctor Samah, Our supervisor"
            className="sup-image"
          />
        </section>
      </main>
    </section>
  );
};
