import React from "react";
import { Form, Input, Button, Select } from "antd";

function QuestionApp({ submit, loading, Fields }) {
  const { TextArea } = Input;
  const { Option } = Select;
  const inputFields = (type, placeholder, options) => {
    if (type === "Selection")
      return (
        <Select placeholder="Select an answer" allowClear>
          {options.map((option, index) => (
            <Option
              key={index}
              value={option.value}
            >
              {option.label}
            </Option>
          ))}
        </Select>
      );
    if (type === "TextArea")
      return <TextArea placeholder={placeholder}></TextArea>;
    if (type === "Text") return <Input placeholder={placeholder}></Input>;
  };

  return (
    <div className="row" style={{ marginTop: "1rem" }}>
      <div className="col-lg-1 col-sm-0"></div>
      <div className="col-lg-10 col-sm-12">
        <Form onFinish={submit} autoComplete="off">
          <Form.Item noStyle>
            {Fields.map((f, index) => (
              <Form.Item
                name={f.label}
                label={f.label}
                rules={
                  f.isRequired && [
                    { required: true, message: "This Field is required!" },
                  ]
                }
                key={index}
                style={{ display: "block" }}
              >
                {inputFields(f.type, f.placeholder, f.options)}
              </Form.Item>
            ))}
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

export default QuestionApp;
