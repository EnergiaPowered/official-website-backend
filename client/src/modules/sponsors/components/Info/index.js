import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPartners } from "services/partners.services";
import "./style.css"

// import imgPlaceholder from "assets/placeholder.png";


export default () => {
    const [partners, setPartners] = useState([]);
  
    useEffect(() => {
      getPartners().then(res => {
        const mainPartners = res.data.filter(partner => partner);
        setPartners(mainPartners);
      })
    }, []);
  
    return (
      <section id="Partners" className="bg-section dark-bg component-font">
        <div className="container">
          <Carousel responsive={responsive} infinite={true}>
            {partners.slice(0, partners.length / 2).map((partner) => {
              return (
                <article className="partner-carousel-item" key={partner._id}>
                  <section className="partner-logo">
                    <img
                      src={partner.imageLink}
                      alt="partner-logo"
                      width={200}
                    />
                  </section>
  
                  <p className="partner-name"> {partner.name} </p>
                </article>
              );
            })}
          </Carousel>
  
          <Carousel responsive={responsive} infinite={true}>
            {partners.slice(partners.length / 2).map((partner) => {
              return (
                <article className="partner-carousel-item" key={partner._id}>
                  <section className="partner-logo">
                    <img
                      src={partner.imageLink}
                      alt="partner-logo"
                      width={200}
                    />
                  </section>
  
                  <p className="partner-name"> {partner.name} </p>
                </article>
              );
            })}
          </Carousel>
  
        </div>
      </section>
    );
  };
  