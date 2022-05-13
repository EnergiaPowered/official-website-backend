import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Messaging from "Util/Messaging/index.js";

/**
 * @file shared/Layout/index.js
 * @module shared/Layout
 * @desc This is the stateless functional component for the Layout.
 * @return {JSX} Layout component
 * @example
 * <Layout>
 *  <PageHeader />
 *  <PageContent />
 * </Layout>
 */
function Layout({ children }) {
  return (
    <>
      <Messaging />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
