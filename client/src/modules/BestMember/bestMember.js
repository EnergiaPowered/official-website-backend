import React, { useState, useEffect } from "react";
import Loader from "shared/Loader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import upRit from "../BestMember/img/upRit.png";
import upLft from "../BestMember/img/upLft.png";
import logoUser from "../BestMember/img/logoUser.png";
import dwRit from "../BestMember/img/dwRit.png";
import dwLft from "../BestMember/img/dwLft.png";
import { getBestMembers } from "./services/bestMember.services";
import "./BMstyle.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default ({ committee }) => {

  const [bestMembers, setBestMembers] = useState(null);

  let params = "isBest=true";
  if (committee) params += `&committee=${committee.replace('&', '%26').replace(/\+/g, '%2b')}`;

  useEffect(() => {
    getBestMembers(params).then(res => setBestMembers(res.data))
  }, [params])

  return bestMembers ? (
    <section id="bestMember" className="bg-section component-font">

      <div className="container">

        <h2 className="section-title">BEST MEMBERS OF THE MONTH</h2>

        <img alt="upper left" className="img-fluid" id="upPng" src={upLft} />
        <img alt="members" id="logoUser" src={logoUser} />
        <img alt="upper right" className="img-fluid" id="upPng" src={upRit} />
        {bestMembers.length ? (
          <Carousel className="mt-3" responsive={responsive} infinite={true}>
            {bestMembers.map((member, index) => {
              return (
                <article className="member-carousel-item" key={index}>
                  <section className="member-logo">
                    {/* <img src={`https://drive.google.com/uc?exort=view&id=${member.imageID}`} alt="best member" /> */}
                    <img src={require(`assets/crew images/${member.committee}/${member.name}.png`)} alt="best member" />
                  </section>

                  <h4 className="member-name"> {member.name} </h4>
                  <h6 className="member-name"> {member.committee} </h6>

                </article>
              );
            })}
          </Carousel>
        ) : <h4>There are no best members in this committee for this month</h4>}
        <div className="row">
          <img alt="lower left" className="img-fluid" id="dwPng" src={dwLft} />
          <img alt="lower right" className="img-fluid" id="dwPng" src={dwRit} />
        </div>

      </div>
    </section>

  ) : <Loader />;
}


