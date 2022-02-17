import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import { Helmet } from "react-helmet";
import QuestionGen from "./QuetionGen/QuestionGen";
import bg_blogs from "assets/Blogs-header.png";
import configs from "globals/config";
import axios from "axios";
import "./index.css";

const FormGen = () => {
  const { TextArea } = Input;
  const [submitted, setSubmited] = useState(false);
  const host = configs.HOST; /*"http://localhost:4000"*/ // localhost:4000 is my demo server matdo2e4 ":D
  const FORM_END_POINT = `${host}form`;
  const getObjects = (someObj, partOfKey) => {
    let neededObjects = [];
    for (let key in someObj) {
      if (`${key}`.includes(partOfKey))
        neededObjects.push({ [key]: someObj[key] });
    }
    return neededObjects;
  };
  const getValue = (someArrOfObjs, partOfKey) => {
    let neededItem;
    for (let obj of someArrOfObjs) {
      for (let key in obj) {
        if (`${key}`.includes(partOfKey)) neededItem = obj[key];
      }
    }
    return neededItem;
  };

  const getField = (fieldProps) => {
    const fields = [];
    for (let i = 1; i <= fieldProps.fieldLabels.length; i++) {
      let field = {
        label: getValue(fieldProps.fieldLabels, `field_${i}_`),
        type: getValue(fieldProps.fieldAnswerTypes, `field_${i}_`),
        isRequired: getValue(fieldProps.fieldisRequired, `field_${i}_`),
      };
      if (field.type === "Selection") {
        const modified = [];
        const options = getValue(fieldProps.fieldSelections, `field_${i}_`);
        for (let item of options) {
          modified.push({
            value: Object.values(item)[0],
            label: Object.values(item)[0],
          });
        }
        field["options"] = modified;
      } else {
        field["placeholder"] = getValue(
          fieldProps.fieldPlaceholders,
          `field_${i}_`
        );
      }
      fields.push(field);
    }
    return fields;
  };

  const submit = (values) => {
    const fieldProps = {
      fieldLabels: getObjects(values, "_label"),
      fieldAnswerTypes: getObjects(values, "_answerType"),
      fieldSelections: getObjects(values, "_selection"),
      fieldPlaceholders: getObjects(values, "_placeholder"),
      fieldisRequired: getObjects(values, "_isRequired"),
    };

    const formData = {
      title: values.name.toLowerCase(), //"" Title of the event => also used to generate form's url
      description: values.description, //""
      postSubmit: values.postSubmit, //"" shown after the form is submitted
      postEvent: values.postEvent, //"" shown after the event is ended
      preEvent: values.preEvent, //"" shown before the event is starts
      resultSheet: values.resultSheet, //"" link of the sheet in-which results shall be stored
      startDate: values.startDate._d.toISOString(), //""
      endDate: values.endDate._d.toISOString(), //""
      fields: getField(fieldProps), //[{label:"", type:"", placeholder:""?, option:[{value,label}]?,isReq:bool}]
    };
    console.log(formData);
    axios
      .post(FORM_END_POINT, formData)
      .then(function (response) {
        console.log(response);
      })
      .then(() => setSubmited(true))
      .catch(function (error) {
        console.log(error);
      });
  };
  const [fields, setfield] = useState([{ id: 1, value: {} }]);
  const removeField = (id) => {
    const f = fields.filter((f) => f.id !== id);
    setfield(f);
  };
  const addField = () => {
    const id = fields.length ? fields[fields.length - 1].id + 1 : 1;
    setfield([...fields, { id: id, value: {} }]);
  };
  return (
    // event title
    // description
    // QuestionGen
    // Add question button
    // after submission messege
    // after form ddl messege
    <div
      className="site-layout page-component"
      style={{ padding: " 50px", background: `url(${bg_blogs})` }}
    >
      <Helmet>
        <title>Energia Powered | Form Creation</title>
      </Helmet>
      <h1 style={{ textAlign: "center", padding: "4em", marginLeft: "-3em" }}>
        Form Creation
      </h1>
      <br />
      <br />

      {submitted ? (
        <h2 style={{ textAlign: "center", padding: "5em" }}>
          Form is successfully created
        </h2>
      ) : (
        <div className="row" style={{ marginTop: "1rem" }}>
          <div className="col-lg-1 col-sm-0"></div>
          <div className="col-lg-10 col-sm-12">
            <Form onFinish={submit} autoComplete="off">
              <Form.Item
                name={"name"}
                label="Event Title :"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please give a name for the Event :D",
                  },
                ]}
              >
                <Input placeholder="Event title" />
              </Form.Item>
              <Form.Item
                name={"description"}
                label="Event Description :"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a description for the form",
                  },
                ]}
              >
                <TextArea placeholder="Write a description for the form" />
              </Form.Item>
              <Form.Item>
                {fields.map(({ id }) => (
                  <QuestionGen id={id} key={id} onRemove={removeField} />
                ))}
              </Form.Item>
              <Button
                type="ghost"
                style={{ color: "white" }}
                shape="round"
                onClick={() => addField()}
                block
              >
                + Add field
              </Button>
              <br />
              <br />
              <br />
              <Form.Item
                name={"postSubmit"}
                label="Post-Submission message :"
                style={{ display: "block" }}
              >
                <TextArea placeholder="Write a message to be shown after the form is submitted" />
              </Form.Item>
              <Form.Item
                name={"preEvent"}
                label="pre-Event message :"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a message",
                  },
                ]}
              >
                <TextArea placeholder="Write a message to be shown before the event starts" />
              </Form.Item>
              <Form.Item
                name={"postEvent"}
                label="Post-Event message :"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a message",
                  },
                ]}
              >
                <TextArea placeholder="Write a message to be shown after the event ends" />
              </Form.Item>

              <Form.Item
                name={"resultSheet"}
                label="Google-Sheet link :"
                style={{ display: "block" }}
                rules={[
                  {
                    required: true,
                    message: "Please enter a the link of the sheet",
                  },
                ]}
              >
                <Input placeholder="Insert link of the sheet in-which results shall be stored " />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Date required",
                  },
                ]}
                label="Start Date"
                name={"startDate"}
              >
                <DatePicker showTime={{ format: "HH:mm" }} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Date required",
                  },
                ]}
                label="End  Date"
                name={"endDate"}
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  style={{ marginLeft: "5px" }}
                />
              </Form.Item>

              <Button
                type="ghost"
                shape="round"
                htmlType="submit"
                size="large"
                block
                style={{ color: "white" }}
              >
                Apply
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormGen;
