import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button } from "antd";
import authHeader from "globals/auth-header";
import { postForgetPassword } from "../services/forgetPassword.services";

function ForgetPassword() {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleForgetPassword = (data) => {
    setLoading(true);
    postForgetPassword(data).then((res) => {
      alert(res.data);
      setLoading(false);
    });
  };

  if (loggedIn) return <Redirect to="/" />;

  return (
    <div className="container login-container">
      <h1 className="login-header">Forget Password</h1>

      <div className="login-form">
        <Form form={form} onFinish={handleForgetPassword} autoComplete="off">
          <Form.Item
            name={"email"}
            label="Enter your Email"
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

          <div className="login-submit-container">
            <Form.Item className="login-submit">
              <Button
                type="secondary"
                htmlType="submit"
                size="large"
                className="bbs"
                disabled={loading}
              >
                Send Link
              </Button>
            </Form.Item>
            <Link to="/login" style={{ display: "block" }}>
              <small>Back to Login</small>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ForgetPassword;
