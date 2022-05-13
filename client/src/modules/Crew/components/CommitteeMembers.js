import React from "react";
import default_image from "../images/default.png";
import "../components/indexComponents.css";
import LazyLoad from "react-lazyload";

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
                    <LazyLoad height={200} offset={100}>
                      {head.image ? (
                        <img
                          onLoad={(e) => {
                            e.target.style.visibility = "visible";
                          }}
                          onError={(e) => {
                            e.target.src = default_image;
                          }}
                          alt={`${head.name} head`}
                          src={head.image}
                          className="img_card rounded-circle"
                        />
                      ) : (
                        <img
                          onLoad={(e) => {
                            e.target.style.visibility = "visible";
                          }}
                          alt={`${head.name} head`}
                          src={default_image}
                          className="img_card rounded-circle"
                        />
                      )}
                    </LazyLoad>
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
                    <LazyLoad height={200} offset={100}>
                      {viceHead.image ? (
                        <img
                          onLoad={(e) => {
                            e.target.style.visibility = "visible";
                          }}
                          onError={(e) => {
                            e.target.src = default_image;
                          }}
                          alt={`${viceHead.name} vice head`}
                          src={viceHead.imag}
                          className="img_card rounded-circle"
                        />
                      ) : (
                        <img
                          onLoad={(e) => {
                            e.target.style.visibility = "visible";
                          }}
                          alt={`${viceHead.name} vice head`}
                          src={default_image}
                          className="img_card rounded-circle"
                        />
                      )}
                    </LazyLoad>
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
                    <LazyLoad height={200} offset={100}>
                      {member.image ? (
                        <img
                          onLoad={(e) => {
                            e.target.style.visibility = "visible";
                          }}
                          onError={(e) => {
                            e.target.src = default_image;
                          }}
                          alt={`${member.name} member`}
                          src={member.image}
                          className="img_card rounded-circle"
                        />
                      ) : (
                        <img
                          onLoad={(e) => {
                            e.target.style.visibility = "visible";
                          }}
                          alt={`${member.name} member`}
                          src={default_image}
                          className="img_card rounded-circle"
                        />
                      )}
                    </LazyLoad>
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
