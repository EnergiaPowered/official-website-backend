import React from "react";

import { Helmet } from "react-helmet";

import "./style.css";

import Login from "./components/LoginComponent";
import Layout from "shared/Layout";

// import bg from "assets/Login-header.jpg";

export default function LoginPage(props) {

    // const style = {
    //     backgroundImage: `url(${bg})`
    // };

    return (
        <div className="page-component" id="sign-in">
            <Helmet>
                <title>Energia Powered | Log In</title>
            </Helmet>

            <Layout>
                <main>
                    <div className="container">
                        <Login props={props} />
                    </div>
                </main>
            </Layout>
        </div>
    );
}
