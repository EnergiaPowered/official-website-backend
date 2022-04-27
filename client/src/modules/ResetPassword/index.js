import React from "react";
import { Helmet } from "react-helmet";

import ResetPassword from "./components/ResetPassword";
import Layout from "shared/Layout";

export default function(props) {
    return (
        <div className="page-component" id="sign-in">
            <Helmet>
                <title>Energia Powered | Reset Password</title>
            </Helmet>

            <Layout>
                <main>
                    <div className="container">
                        <ResetPassword id={new URLSearchParams(props.location.search).get('id')} />
                    </div>
                </main>
            </Layout>
        </div>
    );
}
