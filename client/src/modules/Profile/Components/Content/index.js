import React from "react";
import ContentCard from "./ContentCard";
import "./style.css";

const ProfileContent = ({ events, tasks, committee, role }) => {
  return (
    <div className="profile-content">
      <h2 style={{ margin: "1em" }}>{` ${committee}/ ${role} `}</h2>
      <ContentCard tasks={tasks} />
      <ContentCard events={events} />
    </div>
  );
};

export default ProfileContent;
