import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

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
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;