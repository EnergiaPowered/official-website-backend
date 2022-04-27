import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from "antd";
import authHeader from "globals/auth-header";
import { postResetPassword } from "../services/resetPassword.services";
import "../style.css";
//import Password from "antd/lib/input/Password";

function ResetPassword({id}) {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleResetPassword = (data) => {
    setLoading(true);
    console.log(data);
    delete data.confirm_password;
    console.log(data)
    postResetPassword(id, data).then(res => {
      alert(res.data);
      setLoading(false);
      window.location.href = "/login";
    });
  }

  if (loggedIn) return <Redirect to='/' />;

  return (
    <div className="container login-container">
      <h1 className="login-header">Reset Password</h1>

      <div className="login-form">
        <Form form={form} onFinish={handleResetPassword} autoComplete="off">
          <Form.Item
            name={"password"}
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
          
          <div className="login-submit-container">
            <Form.Item className="login-submit">
              <Button type="secondry" htmlType="submit" size="large" className="bbs" disabled={loading}>
                Reset Password
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
