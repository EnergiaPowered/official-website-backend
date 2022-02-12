import React from 'react';
import { Helmet } from "react-helmet";
import Layout from '../../shared/Layout/index';
import bg_blogs from "assets/Blogs-header.png";
import WorkshopsComponent from "./components/WorkshopList";
import "./index.css";

function Workshops() {
    const style = {
        backgroundImage: `url(${bg_blogs})`,
    };

    return (
        <div className="page-component" style={style}>
            <Helmet>
                <title>Energia Powered | Workshops</title>
            </Helmet>
            <Layout>
                <section id="header" className="header-section">
                    <header className="container">
                        <h1 className="header-title">Workshops</h1>
                    </header>
                </section>
                <WorkshopsComponent />
                <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-5365245317481587"
                    data-ad-slot="1405867898"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
            </Layout>
        </div>
    )
}

export default Workshops;
