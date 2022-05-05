import React, { useEffect } from "react";

import { Helmet } from "react-helmet";

// import Supervisor from "./components/Supervisor";
import Partners from "modules/Partners/components/section";
import Header from "./components/Header";
import Committees from "modules/Committees/components/section";
// import BestMember from "../BestMember/bestMember";
// import Events from "./components/Events";

import Layout from "shared/Layout";

import "./style.css";

import bg from "assets/Home-header.png";

export default () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let style = {
    backgroundImage: `url(${bg})`,
  };

  return (
    <div className="page-component" id="HomePage" style={style}>
      <Helmet>
        <title>Energia Powered | Ain Shams University</title>
      </Helmet>

      <Layout>
        <Header />
        {/* <Events /> */}
        {/* <Supervisor /> */}
        <Committees />
        <Partners />
        {/* <BestMember /> */}
      </Layout>
    </div>
  );
};
