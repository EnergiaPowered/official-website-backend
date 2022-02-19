import React from 'react';
import { Form, Input, Radio } from "antd";

function page2() {
    return <div>
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
    </div>;
    
}

export default page2;