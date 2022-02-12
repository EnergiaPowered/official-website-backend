import moment from "moment";
import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import "./index.css";

const SingleEvent = ({ event }) => {
    const statusMap = {
        Soon: "warning",
        Closed: "danger",
        Opened: "primary"
    }

    return (
        <div className="container_card row" >

            <div className="img_card" >
                {event.eventImageID ?
                    <img alt="event" src={`https://drive.google.com/uc?exort=view&id=${event.eventImageID}`} className="rounded-circle" />
                    :
                    <img alt="event" src={`/images/${event.category}.jpg`} className="rounded-circle" />
                }
            </div>

            <div className="details_card">
                <div className="title_event">
                    <h4>{event.name.toUpperCase()}</h4>
                </div>
                <div className="location_event" >
                    <h6>
                        <HiLocationMarker /> {event.eventLocation.toUpperCase()}
                    </h6>
                </div>
                <div className="date_time_event">
                    <h6>
                        <MdDateRange /> From: {moment(event.startDate).format('MMM Do YYYY, h:mm A')}
                    </h6>
                    <h6>
                        <MdDateRange /> To: {moment(event.endDate).format('MMM Do YYYY, h:mm A')}
                    </h6>
                </div>
                {
                    (event.status === "Opened") &&
                    <div className="details_event">
                        <h6>
                            {event.eventDetails ? (
                                <Link to={event.eventDetails}>More Details</Link>
                            ) : (
                                <Link to={`events/${event._id}/${event.name}`}>More Details</Link>
                            )}
                        </h6>
                    </div>
                }
                <div className={`type_event badge badge-pill badge-${statusMap[event.status]}`}>
                    <h5>{event.status}</h5>
                </div>
            </div>
        </div>
    )
}

export default SingleEvent;