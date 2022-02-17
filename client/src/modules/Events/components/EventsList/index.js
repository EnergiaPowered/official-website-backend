import React from "react";
import SingleEvent from "../SingleEvent";

function EventsComponent({ events }) {
    return (
        <div className="container-fluid">
            {events.map((event, index) => <SingleEvent event={event} key={index} />)}
        </div>
    )
}

export default EventsComponent;
