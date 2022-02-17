import React from "react";
import SingleWorkshop from "../SingleWorkshop";
import serviceFile from "../../service/workshops.service.json";
import "./index.css";

function WorkshopsComponent() {
  return (
    <div className="workshopList">
      {serviceFile["Workshops"].map((workshop, index) => (
        <SingleWorkshop workshop={workshop} key={index} />
      ))}
    </div>
  );
}

export default WorkshopsComponent;
