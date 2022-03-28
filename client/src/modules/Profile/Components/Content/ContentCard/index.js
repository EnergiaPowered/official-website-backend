import React from "react";
import "./style.css";
import img from "assets/placeholder.png";

const ContentCard = ({ tasks, events }) => {
  return (
    <div className="content-card-container">
      {tasks ? (
        <h2 style={{ marginLeft: "0.5em" }}>Tasks</h2>
      ) : (
        <h2 style={{ marginLeft: "0.5em" }}>Events</h2>
      )}
      <hr style={{ width: "100%", size: "1", color: "black" }} />
      {tasks
        ? tasks.map((task, index) => {
            return (
              <div className="content-card" key={index}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <a style={{ float: "right" }} href={task.redirect}>
                  {"more details >"}
                </a>
              </div>
            );
          })
        : events
        ? events.map((event, index) => {
            return (
              <div className="content-card" key={index}>
                <div className="event-img">
                  <img alt="placeholder" src={img} />
                </div>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <a style={{ float: "right" }} href={event.redirect}>
                  {"more details >"}
                </a>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ContentCard;
