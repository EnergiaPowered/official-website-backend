import React, { useState, useEffect } from "react";

import { Helmet } from "react-helmet";

import "./style.css";

import Vision from "../Vision";
import Mission from "../Mission";
import Structure from "../Structure";
import Header from "../Header";
import Layout from "shared/Layout";

import bg from "assets/About-header.png";

export default function AboutPage() {
 /**
 * stateOBj object
 * @type {{vision: string}}
 */
  let stateObj = {
    vision:
      "Preparing calibers by developing students in both personal and career levels to make them qualified for the market needs."
  };

  let style = {
    backgroundImage: `url(${bg})`
  };
 
 /** 
  * set the stat with stateObj
 * @typedef {Object} state 
 */
  const [state] = useState(stateObj);

  /**
 * scroll to the top of the page
 * @returns {void} 
 */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
 * Component which contain About page that is consist of
 *  Layout - Header - Vision - Mission - Structure
 * @component 
 * @returns {JSX} Return all commponents of About page
 */
  return (
    <div className="page-component" id="About" style={style}>
      <Helmet>
        <title>Energia Powered | About us</title>
      </Helmet>

      <Layout>
        <Header />
        <main>
          <div className="container">
            <Vision vision={state.vision} />
            <hr />

            <Mission />
            <hr />

            <Structure />
          </div>
        </main>
      </Layout>
    </div>
  );
}
