import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Radio, Button } from "antd";
import { addUser } from "../services/register.services";
import "../style.css";
import authHeader from "globals/auth-header";

function Register() {
  const loggedIn = Object.keys(authHeader()).length ? true : false;

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();

  const handleRegister = (data) => {
    setMessage("");
    setSuccessful(false);
    addUser(data)
      .then(response => {
        setSuccessful(true);
        setMessage(response.data.message);
        form.resetFields();
      }, error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      });
  };

  if (loggedIn) return <Redirect to='/' />;

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
            <div>
              <Form.Item
                name={"firstname"}
                label="First Name"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your first name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"lastname"}
                label="Last Name"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your last name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"phone"}
                label="Phone Number"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"email"}
                label="Email"
                style={{ display: "block" }}
                rules={[
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm_password"
                label="Confirm Password"
                style={{ display: "block" }}
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name={"isGraduated"}
                label="Are you graduated?"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please choose whether you are graduated or not",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio className="d-block" value={true}>
                    Yes
              </Radio>
                  <Radio className="d-block" value={false}>
                    No
              </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name={"university"}
                label="University"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your university name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"faculty"}
                label="Faculty"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your faculty name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"department"}
                label="Department"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your department",
                  },
                ]}
              >
                <Input placeholder="Write none if you are not in a specific department" />
              </Form.Item>
              <Form.Item
                name={"graduationYear"}
                label="Year of graduation"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter your graduation year",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {message && (
                <div className="form-group">
                  <div
                    className={successful ? "alert alert-success" : "alert alert-danger"}
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <div className="register-submit-container">
                <Form.Item className="register-submit">
                  <Button type="secondry" htmlType="submit" size="large">
                    Sign Up
                  </Button>
                </Form.Item>
                <Link to="/login">
                  <small>Already have an account?</small>
                </Link>
              </div>
            </div>
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
