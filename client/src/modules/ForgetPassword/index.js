import React from "react";
import { Helmet } from "react-helmet";

import ForgetPassword from "./components/ForgetPassword";
import Layout from "shared/Layout";

export default function () {
  return (
    <div className="page-component" id="sign-in">
      <Helmet>
        <title>Energia Powered | Forget Password</title>
      </Helmet>

      <Layout>
        <main>
          <div className="container">
            <ForgetPassword />
          </div>
        </main>
      </Layout>
    </div>
  );
}
