import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "antd";
import { addUser } from "../services/register.services";
import authHeader from "globals/auth-header";
import PersonalSection from "./PersonalSectionComponent";
import EducationSection from "./EducationSectionComponent";
import "../style.css";

function Register() {
  const loggedIn = Object.keys(authHeader()).length ? true : false;

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();
  const [page, setPage] = useState(0);

  const handleRegister = (data) => {
    setMessage("");
    setSuccessful(false);
    addUser(data).then(
      (response) => {
        setSuccessful(true);
        setMessage(response.data.message);
        form.resetFields();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  if (loggedIn) return <Redirect to="/" />;

  return (
    <div className="container register-container">
      <h1 className="register-header">Sign Up</h1>

      <div className="register-form">
        <Form
          form={form}
          onFinish={handleRegister}
          scrollToFirstError
          autoComplete="off"
        >
          {!successful && (
            <>
              <div style={{ display: page === 1 && "none" }}>
                <PersonalSection />
              </div>
              <div style={{ display: page === 0 && "none" }}>
                <EducationSection />
              </div>
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <div className="register-submit-container">
                <Form.Item className="register-submit">
                  <Button
                    onClick={() => {
                      setPage(page === 0 ? 1 : 0);
                    }}
                    type="secondary"
                    size="large"
                  >
                    {page === 0 ? "Next" : "Back"}
                  </Button>
                </Form.Item>

                {page === 1 && (
                  <Form.Item className="register-submit">
                    <Button type="secondary" htmlType="submit" size="large">
                      Sign Up
                    </Button>
                  </Form.Item>
                )}

                <Link to="/login">
                  <small>Already have an account?</small>
                </Link>
              </div>
            </>
          )}
          {message && successful && (
            <h6 className="text-center" style={{ color: "white" }}>
              {message}
            </h6>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Register;
