import React, { useState } from "react";

// using fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
/***
 * import { faFacebook, faYoutube, faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
 * is cleaner instead of lines (5:10)
 */

import "./style.css";

/**
 * Component which contains social media links for Energia Powered
 * 
 * @component 
 * @returns {JSX} Footer Component
 */
function Footer() {
  let socialData = [
    { link: "https://www.facebook.com/Energia.Powered/", label: faFacebook },
    {
      link: "https://www.youtube.com/channel/UCxNgZOJJx9LzqWLhCEu8Djw",
      label: faYoutube
    },
    { link: "https://www.instagram.com/energia.powered/", label: faInstagram },
    { link: "https://twitter.com/Energia_Powered", label: faTwitter },
    {
      link: "https://www.linkedin.com/company/energiapowered/",
      label: faLinkedin
    }
  ];
  const [social] = useState(socialData);
  return (
    <footer id="Footer">
      <ul className="text-center social-links row list-unstyled">
        {social.length > 0 &&
          social.map(item => {
            return (
              <li key={item.link} className="social-links-item col-xs-2">
                {/* noopener & nopreferrer to prevent vulnerbilities */}
                <a target="_blank" rel="noopener noreferrer" href={item.link}>
                  <FontAwesomeIcon icon={item.label} />
                </a>
              </li>
            );
          })}
      </ul>
    </footer>
  );
};

export default Footer;
