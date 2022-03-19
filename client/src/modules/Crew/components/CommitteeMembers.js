import React from "react";
import default_image from "../images/default.png";
import "../components/indexComponents.css";

function CommitteeMembers({ members, heads, viceHead, committeeName }) {
  return (
    <div>
      {heads.length || members.length ? (
        <div>
          <div className="title_community">
            <h2>{committeeName}</h2>
          </div>
          <div className="heads_container container">
            <div className=" heads_community row">
              {heads.map((head, index) => (
                <div key={index} className="card_head col-12 col-md-6">
                  <div className="d-flex justify-content-center">
                    {
                      // head.imageID ?
                      // <img alt="head" src={require(`assets/crew images/${committeeName}/${head.name}.png`)} className="img_card rounded-circle" />
                      // <img alt="head" src={`https://drive.google.com/uc?exort=view&id=${head.imageID}`} className="img_card rounded-circle" />
                      // :
                      <img
                        alt="head"
                        src={default_image}
                        className="img_card rounded-circle"
                      />
                    }
                  </div>
                  <div className="text_head">
                    <h5>{head.name}</h5>
                  </div>
                  <div className="text_head">
                    <h6>{head.position}</h6>
                  </div>
                </div>
              ))}

              {viceHead ? (
                <div className="card_head col-12 col-md-6">
                  <div className="d-flex justify-content-center">
                    {/* {viceHead.imageID ? (
                      <img
                        alt="head"
                        src={require(`assets/crew images/${committeeName}/${viceHead.name}.png`)}
                        className="img_card rounded-circle"
                      />
                    ) : ( */}
                    {/* // <img alt="vice head" src={`https://drive.google.com/uc?exort=view&id=${viceHead.imageID}`} className="img_card rounded-circle" /> */}
                    <img
                      alt="vice head"
                      src={default_image}
                      className="img_card rounded-circle"
                    />
                    {/* )} */}
                  </div>
                  <div className="text_head">
                    <h5>{viceHead.name}</h5>
                  </div>
                  <div className="text_head">
                    <h6>{viceHead.position}</h6>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <hr />
          <div className=" container">
            <div className=" row members_community">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="card_member col-12 col-sm-6 col-md-4 col-lg-3 pb-3"
                >
                  <div className="img_member">
                    {/* {member.imageID ? (
                      <img
                        alt="member"
                        src={require(`assets/crew images/${committeeName}/${member.name}.png`)}
                        className="img_card rounded-circle"
                      />
                    ) : ( */}
                    {/* // <img alt="member" src={`https://drive.google.com/uc?exort=view&id=${member.imageID}`} className="img_card rounded-circle" /> */}
                    <img
                      alt="member"
                      src={default_image}
                      className="img_card rounded-circle"
                    />
                    {/* )} */}
                  </div>
                  <div className="text_member">
                    <h5 style={{ paddingTop: "5px" }}>
                      {member.isBest ? `★${member.name}★` : member.name}
                    </h5>
                  </div>
                  <div className="text_member">
                    <h6>
                      {member.isBest
                        ? `Best ${member.position}`
                        : member.position}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default CommitteeMembers;
