import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from '../../shared/Layout/index';
import EventsComponent from "./components/EventsList";
import { getEvents } from "./services/events.services";
import "./index.css";

function Events() {
    const [handelPage, setHandelPage] = useState(null);

    useEffect(() => { viewEvents() }, []);

    const viewEvents = () => {
        getEvents().then((res) => {
            let events = res.data.sort((a, b) => {
                if (a.date < b.date) {
                    return -1;
                }
                if (a.date > b.date) {
                    return 1;
                }
                return 0;
            });
            setHandelPage(<EventsComponent events={events} />);
        });
    }

    return (
        <div className="page-component">
            <Helmet>
                <title>Energia Powered | Events</title>
            </Helmet>
            <Layout>
                <div className="page_container">
                    <h1 id="dropE" style={{textAlign: "center"}}>Events</h1>
                </div>

                <div> {handelPage} </div>
            </Layout>
        </div>
    )
}

export default Events;
