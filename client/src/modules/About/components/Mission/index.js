import React from "react";

/**
 * Component which contain The Mission of Energia Powered
 * 
 * @component 
 * @returns {JSX} Return the Mission Component
 */

export default () => {
  return (
    <section className="bg-section about-mission component-font">
      <h2 className="section-title">Our Mission</h2>
      <p>
        Energia Powered attempts to deliver values and achieve its vision
        through different projects:
      </p>

      <ul>
        <li> Conference </li>
        <li> Training Sessions </li>
        <li> Events </li>
        <li> Field Trips </li>
      </ul>
    </section>
  );
};
