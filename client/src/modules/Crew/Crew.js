import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Layout from "../../shared/Layout/index";
import CommitteeMembers from "./components/CommitteeMembers";
import { getCrew } from "./services/crew.services";
import "./index.css";

function Crew() {
  const [switchPage] = useState([
    "High Board",
    "Arduino & Embedded Systems",
    "C++",
    "DCR",
    "Design",
    "Digital Electronics",
    "Fundraising",
    "Human Resources",
    "Logistics",
    "Management",
    "Marketing",
    "Media",
    "Mobile App Development",
    "Public Relations",
    "Web Development",
  ]);
  const [handelPage, setHandelPage] = useState(null);

  useEffect(() => {
    viewCrew("High Board");
  }, []);

  const viewCrew = (committee) => {
    document.querySelectorAll(".scrollmenu div").forEach((c) => {
      if (c.innerText === committee.toUpperCase()) {
        c.classList.add("current");
      } else {
        c.classList.remove("current");
      }
    });
    const params = `committee=${committee
      .replace("&", "%26")
      .replace(/\+/g, "%2b")}`;
    getCrew(params).then((res) => {
      if (committee !== "Structure") {
        let members = res.data.filter(
          (member) => member.committee === committee
        );
        let heads;
        let viceHead = null;
        if (committee === "High Board") {
          heads = members.filter((member) => member.position === "President");
          viceHead = members.filter(
            (member) => member.position === "General Vice President"
          )[0];
          members = members
            .filter(
              (member) =>
                member.position !== "President" &&
                member.position !== "General Vice President"
            )
            .sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
        } else {
          heads = members.filter((member) => member.position === "Head");
          viceHead = members.filter(
            (member) => member.position === "Vice Head"
          )[0];
          members = members
            .filter((member) => member.position === "Member")
            .sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
        }
        setHandelPage(
          <CommitteeMembers
            members={members}
            heads={heads}
            viceHead={viceHead}
            committeeName={committee}
          />
        );
      }
    });
  };

  const handleArrowClick = (direction) => {
    const committeesList = document.querySelector(".scrollmenu");
    committeesList.scrollLeft += direction === "left" ? -100 : 100;
  };

  return (
    <div className="page-component">
      <Helmet>
        <title>Energia Powered | Crew</title>
      </Helmet>
      <Layout>
        <div className="page_container">
          <h1 id="dropE">CREW</h1>
          <div className="d-flex align-items-center">
            <button
              className="left-arrow arrows"
              onClick={() => handleArrowClick("left")}
            >
              <IoIosArrowDropleft className="left-arrow" />
            </button>
            <div className="scrollmenu">
              {switchPage.map((page, index) => (
                <div key={index} onClick={() => viewCrew(page)}>
                  {page}
                </div>
              ))}
            </div>
            <button
              className="right-arrow arrows"
              onClick={() => handleArrowClick("right")}
            >
              <IoIosArrowDropright className="right-arrow" />
            </button>
          </div>
        </div>

        <div> {handelPage} </div>
      </Layout>
    </div>
  );
}
export default Crew;
