import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from "react-dom";
import Footer from "./../index";

// test for crashing
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <Footer />
    </Router>
    , div
  );
  ReactDOM.unmountComponentAtNode(div);
});
