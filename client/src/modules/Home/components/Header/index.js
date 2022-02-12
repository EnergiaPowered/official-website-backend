import React, { useState } from "react";

// css
import "./style.css";

export default function Header() {
  let stateObj = {
    slogan: "Collaborate to innovate"
  };
  const [state] = useState(stateObj);
  return (
    <section id="header" className="header-section">
      <header className="container">
        <h1 className="header-title"> Energia Powered </h1>

        <p className="header-slogan">
          <q>{state.slogan}</q>
        </p>
      </header>
    </section>
  );
};
