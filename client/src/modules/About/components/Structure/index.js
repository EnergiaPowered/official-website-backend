import React, { useState } from "react";

// image preview on click
import Image from "react-image-enlarger";

// to be dynamic
import structureImg from "assets/Structure.jpg";

export default () => {
 /** 
 * set the zoomed with false initialy
 * @typedef {Boolean} zoomed 
 * @typedef {Function} setZoomed
 */
  const [zoomed, setZoomed] = useState(false);


 /**
 * Component which contain the Structure of Enrgia Powered 
 * Image for the Structure 
 * @component 
 * @returns {JSX} Return Structure Section
 */
  return (
    <section className="bg-section about-structure">
      <h2 className="section-title">Our Structure</h2>
      <div className="d-flex justify-content-center">
        <Image
          data-testid="structure-image"
          zoomed={zoomed}
          src={structureImg}
          data-teststate={zoomed}
          alt="Our team's structure"
          title="Energia Powered'21 board"
          onClick={() => setZoomed(true)}
          onRequestClose={() => setZoomed(false)}
        />
      </div>
    </section>
  );
};
