import React from "react";
import "./events.css";

const event = ({ name, img }) => {
  return (
    <div className="card Mcard">
      <img src={img} className="card-img-top " alt="..." />
      <div className="card-body body">
        <h5 className="card-title text-center ">{name}</h5>
      </div>
    </div>
  );
};

export default event;
