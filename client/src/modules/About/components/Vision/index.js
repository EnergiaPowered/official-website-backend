import React from "react";

/**
 * Component which contain The Vision of Energia Powered
 * 
 * @component 
 * @returns {JSX} Return the vision that passed
 */

export default ({ vision }) => {
  return (
    <section className="bg-section about-vision component-font">
      <h2 className="section-title">Our Vision</h2>
      <p data-testid="vision-text"> {vision} </p>
    </section>
  );
};
