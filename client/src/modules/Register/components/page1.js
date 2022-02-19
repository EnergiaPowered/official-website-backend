import React from 'react';
import { Form, Input } from "antd";

function page1() {
    return <div >
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
    </div>;
    
}

export default page1;