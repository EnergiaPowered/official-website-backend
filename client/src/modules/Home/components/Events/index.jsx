import React, { Component } from "react";
import "./events.css";
import Event from "./event.js";
import { Link } from "react-router-dom";

export default class EventCard extends Component {
  state = {
    events: [
      {
        name: "Zo2 3agalak",
        img: "http://via.placeholder.com/640x360"
      },
      {
        name: "Energia Gates",
        img:
          "http://via.placeholder.com/640x360"
      },
      {
        name: "Filed Trips",
        img: "http://via.placeholder.com/640x360"
      }
    ]
  };
  render() {
    return (
      <section className="container bg-section component-font" id="events">
        <h2 className="section-title text-center"> OUR EVENTS </h2>

        <section className="row Allevents">
          {this.state.events.map(e => (
            <div key={e.name} className="col-md-4 col-sm-6 HomeEvent">
              <Event name={e.name} img={e.img}></Event>
            </div>
          ))}
        </section>
        <div className="text-center">
          <Link  className="btn btn-light btn-center" to="/events">See More</Link>
        </div>
      </section>
    );
  }
}
