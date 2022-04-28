import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import questions from "../services/questions.services.json";

function Application({ submit, loading }) {
  const { TextArea } = Input;
  const { Option } = Select;
  const [Questions, setQuestions] = useState(null);
  const [committees] = useState([
    // { label: "Web Development", value: "web" },
    // { label: "Mobile Development", value: "mobile" },
    { label: "Data Science", value: "data" },
    // { label: "Public Relations", value: "PR" },
    // { label: "Fundraising", value: "fundraising" },
    // { label: "Human Resources", value: "HR" },
    // { label: "DCR", value: "DCR" },
    // { label: "Quality Management", value: "QM" },
    // { label: "Arduino", value: "arduino" },
    // { label: "Emebedded Systems", value: "ES" },
    // { label: "C++ & OOP", value: "cpp" },
    // { label: "Data Structure", value: "DS" },
    { label: "MATLAB", value: "matlab" },
    // { label: "Design", value: "design" },
    // { label: "Media", value: "media" },
    // { label: "Marketing", value: "marketing" }
  ]);

  const handleChange = (choice) => {
    choice in questions
      ? setQuestions(
          questions[choice].map((question, index) => {
            if ("text" in question) {
              return (
                <Form.Item noStyle>
                  <p
                    dangerouslySetInnerHTML={{ __html: question.text }}
                    style={{ color: "white", marginBottom: "1rem" }}
                  ></p>
                  <Form.Item
                    key={index}
                    name={question.name}
                    label={question.label}
                    style={{ display: "block" }}
                    rules={question.rules}
                  >
                    {question.type === "text" ? (
                      <Input />
                    ) : question.type === "textarea" ? (
                      <TextArea rows={4} />
                    ) : (
                      <Select placeholder="Select an answer" allowClear>
                        {question.options.map((option, index) => (
                          <Option key={index} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Form.Item>
              );
            }

            return (
              <Form.Item
                key={index}
                name={question.name}
                label={question.label}
                style={{ display: "block" }}
                rules={question.rules}
              >
                {question.type === "text" ? (
                  <Input />
                ) : question.type === "textarea" ? (
                  <TextArea rows={4} />
                ) : (
                  <Select placeholder="Select an answer" allowClear>
                    {question.options.map((option, index) => (
                      <Option key={index} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            );
          })
        )
      : setQuestions(null);
  };

  return (
    <div className="row" style={{ marginTop: "1rem" }}>
      <div className="col-lg-1 col-sm-0"></div>
      <div className="col-lg-10 col-sm-12">
        <Form onFinish={submit} autoComplete="off">
          <Form.Item
            name={"name"}
            label="Full Name"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"phone"}
            label="Phone Number (Active on WhatsApp)"
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
            label="Email Address"
            style={{ display: "block" }}
            normalize={(value) => value.trim()}
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address",
              },
              {
                required: true,
                message: "Please enter your email address",
              },
            ]}
          >
            <Input />
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
            name={"grad_year"}
            label="Graduation Year"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please enter your graduation year",
              },
            ]}
          >
            <Input placeholder="Ex: 2023" />
          </Form.Item>
          <Form.Item
            name={"prev_exp"}
            label="Do you have any previous experience? If yes, tell us about it."
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please fill this field",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name={"reasons"}
            label="What are your reasons of applying?"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please enter your reasons of applying",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name={"f_url"}
            label="Facebook Account URL"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please enter your Facebook account URL",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"lnkd_url"}
            label="LinkedIn Profile URL"
            style={{ display: "block" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"preference1"}
            label="Preference"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please select your prefernce",
              },
            ]}
          >
            <Select
              placeholder="Select the committee you want join"
              allowClear
              onChange={handleChange}
            >
              {committees.map((session, index) => (
                <Option key={index} value={session.value}>
                  {session.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={"pref_reason"}
            label="Why did you choose that committee?"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please tell us why did you choose that committee",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          {Questions}
          {/* <Form.Item
            name={"preference2"}
            label="Second preference"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please select your second prefernce",
              },
            ]}
          >
            <Select placeholder="Select the committee you want join" allowClear>
              {committees.map((session, index) => <Option key={index} value={session.value}>{session.label}</Option>)}
            </Select>
          </Form.Item> */}
          <Form.Item
            name={"reputation"}
            label="From where did you know Energia Powered?"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please select an answer",
              },
            ]}
          >
            <Select placeholder="Select an answer" allowClear>
              <Option value="facebook">Facebook</Option>
              <Option value="instagram">Instagram</Option>
              <Option value="linkedin">LinkedIn</Option>
              <Option value="friends">Friends</Option>
              <Option value="ex-energian">Ex Energian</Option>
              <Option value="others">Others</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={"attendance"}
            label="Did you attend any EP events? If yes, tell us about them."
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please fill this field",
              },
            ]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name={"hobbies"}
            label="What are your hobbies?"
            style={{ display: "block" }}
            rules={[
              {
                required: true,
                message: "Please enter your hobbies",
              },
            ]}
          >
            <TextArea rows={2} placeholder="Swimming, Reading, and Running" />
          </Form.Item>
          <Form.Item
            name={"comments"}
            label="Any comments?"
            style={{ display: "block" }}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              type="secondary"
              htmlType="submit"
              size="large"
              block
              disabled={loading ? true : false}
            >
              Apply
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Application;
