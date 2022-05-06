import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { Helmet } from "react-helmet";

import Layout from "shared/Layout";
import Loader from "shared/Loader";


import { getPartners } from "../../services/partners.services";

import "./style.css";

import bg from "assets/Blogs-header.png";

export default function() {

  const [partners, setPartners] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    getPartners().then((res) => setPartners(res.data));
  }, []);

  let style = {
    backgroundImage: `url(${bg})`
  };

  return (
    <>
      { partners.length ? (
        <>
          <Helmet>
            <title>Energia Powered | Partners</title>
          </Helmet>
          <Layout>
          <article className="page-component" id="Partners" style={style}>
            <header className="header-section">
              <h1>Partners</h1>
            </header>

            <main>
              <div className="row mx-0">
                {partners.map((partner) => (
                  <div key={partner._id} className="partner-card col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="img-container">
                      <LazyLoad height={300} offset={200}>
                        <img src={partner.image} alt="partner logo" />
                      </LazyLoad>
                    </div>
                    <h3>{partner.name}</h3>
                  </div>
                ))}
              </div>
            </main>

          </article>
              </Layout>
        </>
      ) : <Loader />}
    </>
  );
}
