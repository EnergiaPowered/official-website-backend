import React from "react";

import { Helmet } from "react-helmet";

import "./style.css";

import Register from "./components/RegisterComponent";
import Layout from "shared/Layout";

// import bg from "assets/Registeration-header.jpg";

export default function RegisterationPage() {

    // const style = {
    //     backgroundImage: `url(${bg})`,
    //     backgroundPosition: "left"
    // };

    return (
        <div className="page-component" id="sign-up">
            <Helmet>
                <title>Energia Powered | Registeration</title>
            </Helmet>

            <Layout>
                <main>
                    <div className="container">
                        <Register />
                    </div>
                </main>
            </Layout>
        </div>
    );
}
