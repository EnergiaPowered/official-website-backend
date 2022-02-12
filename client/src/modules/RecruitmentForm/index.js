import React, { useState, useEffect } from "react";
import Layout from "shared/Layout";
import Application from "./components/Application";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import $ from "jquery";
import "./index.css";

function RecruitmentForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (new Date() > new Date(2021, 10 - 1, 14, 23, 59, 59))
            setFinished(true);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [submitted]);

    const submit = (values) => {
        if (!finished) {
            setLoading(true);

            values.preference2 = values.preference1;

            const sheets = {
                all: "https://script.google.com/macros/s/AKfycby-o7UnVNSnDPaT2_lqJwoFD3p5J9DsoXHEF6FiFShZSl6FvjE1roi2c-DaVg415xKa/exec",
                // web: "https://script.google.com/macros/s/AKfycbxmJdKW9mq8ZtJwetkUZDqDcvfwXzt9FggiZNXoVH4HOFhXmtCiUb5csFIyhM2HyRrL/exec",
                // mobile: "https://script.google.com/macros/s/AKfycbxnVHp_kQ0Htrh07fhSedVjOAwkvcT9NT0maU_NqskB-gwlEOXnBE86yUtk-WzIiByL4Q/exec",
                data: "https://script.google.com/macros/s/AKfycbwrD9R3o9_sZcZr_ls_WygeoLpBgkd4fBI8oLrdq9_hlBeCrGxX9D0lTFKpEvr2zVhe/exec",
                // PR: "https://script.google.com/macros/s/AKfycbxYMn1LDc_fCzrI8o5quPqJIIV3gsr88VfnZY7Vp0itWfUDPEWFyGFXwiW040Yfwu_K/exec",
                // fundraising: "https://script.google.com/macros/s/AKfycbxEZS0IAlk5e-or6j87KWknI-2Z33qVG5kxTR6EPWzZKl2EmD63Wd5XjPJRf7wB_oym/exec",
                // HR: "https://script.google.com/macros/s/AKfycbwCkDx5A-78jbLCYXWrQdOqOngjmvHsMBPHVOJ1pJUHA6N9ul903B9ars_w_EY4e84J/exec",
                // DCR: "https://script.google.com/macros/s/AKfycbySmRI8Cj0vfhehXRIXQMLNDu_6OIbFnhDqJ_TsVqM_J2O17ctIV4QJaAYRoM4KoEfseQ/exec",
                // QM: "https://script.google.com/macros/s/AKfycbzk0fktmfFhmitTAQKDLK97nRPC6aLeSAzozlP0t8VgGI4yOXMYogcV11RXGud6rCiKLA/exec",
                // arduino: "https://script.google.com/macros/s/AKfycbzlT3uawsXJw-JA2a-sUfUE_PxM0CnNMgMGYLEdHbN2iMzYlsjAbIkEZMwp5W6UDGQl/exec",
                // ES: "https://script.google.com/macros/s/AKfycbz15IN1ZqVSXYt2xc5c9MZTvKHGZOzZPMTkBHvIMxGq8V_6bUKaMSkaqh-p2yfiFQXy/exec",
                // cpp: "https://script.google.com/macros/s/AKfycbyFRc0UNf9x0zirsyLMJlVvEAZWVJ_U1HbyKEosvRdSE-wKoi_G-ovHuor4cACYP7rZ/exec",
                // DS: "https://script.google.com/macros/s/AKfycbxQMMg9hFLm3pB-w6CxQyNQsRey36Xp46J8SbkehPv17xS16DWlJ7XAQaVNBbzPCsCZtQ/exec",
                matlab: "https://script.google.com/macros/s/AKfycbwc-Fw0xaz75DT3d6m6gpApcUFz1VX8kme13TPVrX5fAMaQDOrO3HBh9_S_kk10Vm59Ag/exec",
                // design: "https://script.google.com/macros/s/AKfycbwwP62zr9tZP5AUDZ8n9tRTTes7w-ulrxa1yVQ0MaSFcClsukO5t_6GI2OdZ4rrhKg0mw/exec",
                // media: "https://script.google.com/macros/s/AKfycbyboUtnwj3mj0cxQ1YkVamVxW7aaqaV9lVrNh5zLnxHjI8906xeDiDDxAHmyT-qdIRo/exec",
                // marketing: "https://script.google.com/macros/s/AKfycbwj8-ZDHYQ0oYV8jks0P2UKUtuEOqR0DUPLO5eUztxPuifLu2MrrmBdUfdPB7RXsHY0tA/exec"
            }

            $.ajax({
                url: sheets.all,
                method: "POST",
                dataType: "json",
                data: values,
                success: () => {
                    $.ajax({
                        url: sheets[values.preference1],
                        method: "POST",
                        dataType: "json",
                        data: values,
                        success: () => {
                            setSubmitted(true);
                            setLoading(false);
                        },
                        error: () => {
                            alert("Your application didn't get saved successfully. Please try again.");
                            setLoading(false);
                        }
                    });
                },
                error: () => {
                    alert("Your application didn't get saved successfully. Please try again.");
                    setLoading(false);
                }
            });
        }
    };

    return (
        <div
            className="site-layout page-component"
            style={{ padding: "0 50px", marginTop: "180px" }}
        >
            <Helmet>
                <title>Energia Powered | Members' Recruitment</title>
            </Helmet>
            <Layout>
                <div className="recruitment-page row">
                    <div className="col-lg-2 col-sm-0"></div>
                    <div
                        className="col-lg-8 col-sm-12"
                        style={{ backgroundColor: "#0000002e", padding: "1.5rem 1rem" }}
                    >
                        <div className="info-section">
                            <div className="name">
                                <div className="col">
                                    <h1 style={{ textAlign: "center" }}>
                                        Members' Recruitment
                                    </h1>
                                </div>
                            </div>
                            <div
                                className="info"
                                style={{ padding: "0.8rem", textAlign: "center" }}
                            >
                                {submitted ? (
                                    <p>
                                        Thank you for filling out your information!<br />
                                        We will get in touch with you for more details about the interview as soon as possible. So, wait for us.<br />
                                        And if you have any questions, don’t hesitate to ask us through our page messages.
                                    </p>
                                ) : (
                                    <div>
                                        {!finished ? (
                                            <div>
                                                <p>
                                                    This application form to join <strong>Energia Powered</strong> as a member, so if you are interested, fill this form and join us!
                                                </p>
                                                <p>
                                                    You can read the job descriptions of the committees from <Link to="/Committees' Job Description II.pdf" target="_blank" rel="noopener noreferrer">here</Link>
                                                </p>
                                            </div>
                                        ) : (
                                            <h4>
                                                The form has been closed
                                                <span role="img" aria-label="sad">
                                                    😥
                                                </span>
                                                <br />
                                                Better luck next time
                                                <span role="img" aria-label="twink">
                                                    😉
                                                </span>
                                            </h4>
                                        )}
                                    </div>
                                )}
                            </div>
                            {(submitted || finished) ? null : <Application submit={submit} loading={loading} />}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default RecruitmentForm;
