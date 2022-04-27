import React, { useState } from "react";
import img from "assets/placeholder.png";
import "./style.css";
import { Form, Button, Input } from "antd";
const IdentityCard = (props) => {
  // const user = {
  //   name: "Mahmoud Hafez",
  //   bio: "قصة قصيرة حزينة ☺",
  //   email: "quadm@gmail.com",
  //   univ: "Ainshams",
  //   faculty: "Engineering",
  //   department: "Data Science",
  // };
  const { TextArea } = Input;
  const [editState, setEditState] = useState(false);
  const submit = (values) => {
    const val = {};
    Object.keys(values).forEach((key) =>
      values[key] ? (val[key] = values[key]) : null
    );
    console.log("Editted", val);
    setEditState(false);
  };

  const { name, bio, email, univ, faculty, department } = props;
  return (
    <div className="profile-id-card">
      <div className="profile-id-img">
        <img alt="placeholder" src={img} />
      </div>
      <h2 style={{ textAlign: "center", marginTop: "1em" }}>{name}</h2>

      {editState ? (
        <Form onFinish={submit} autoComplete="off">
          <Form.Item noStyle>
            <Form.Item name={"bio"}>
              <div className="id-content-card">
                <h4>bio</h4>
                <TextArea
                  style={{
                    backgroundColor: "rgb(0,0,0,0.1)",
                    color: "white",
                    borderRadius: "1em",
                  }}
                  placeholder={bio}
                />
              </div>
            </Form.Item>

            <Form.Item name={"email"}>
              <div className="id-content-card">
                <h4>Email</h4>
                <Input
                  style={{
                    backgroundColor: "rgb(0,0,0,0.1)",
                    color: "white",
                    borderRadius: "1em",
                  }}
                  placeholder={email}
                />
              </div>
            </Form.Item>
            <Form.Item>
              <div className="id-content-card">
                <h4>University</h4>
                <Form.Item name={"univ"}>
                  <Input
                    style={{
                      backgroundColor: "rgb(0,0,0,0.1)",
                      color: "white",
                      borderRadius: "1em",
                    }}
                    placeholder={univ}
                  />
                </Form.Item>
                <h4>Faculty</h4>
                <Form.Item name={"faculty"}>
                  <Input
                    style={{
                      backgroundColor: "rgb(0,0,0,0.1)",
                      color: "white",
                      borderRadius: "1em",
                    }}
                    placeholder={faculty}
                  />
                </Form.Item>
                <h4>Department</h4>
                <Form.Item name={"department"}>
                  <Input
                    style={{
                      backgroundColor: "rgb(0,0,0,0.1)",
                      color: "white",
                      borderRadius: "1em",
                    }}
                    placeholder={department}
                  />
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="ghost"
                shape="round"
                htmlType="submit"
                size="large"
                block
                style={{ color: "white", marginTop: "2vw" }}
              >
                Apply
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      ) : (
        <>
          <div className="id-content-card">
            <h4>bio</h4>
            <p>{bio}</p>
          </div>

          <div className="id-content-card">
            <h4>Email</h4>
            <p>{email}</p>
          </div>
          <div className="id-content-card">
            <h4>University</h4>
            <p>{univ}</p>
            <h4>Faculty</h4>
            <p>{faculty}</p>
            {department ? (
              <>
                <h4>Department</h4>
                <p>{department}</p>
              </>
            ) : null}
          </div>

          <Button
            onClick={() => setEditState(!editState)}
            type="ghost"
            shape="round"
            htmlType="submit"
            size="large"
            block
            style={{ color: "white", marginTop: "2vw" }}
          >
            Edit
          </Button>
        </>
      )}
    </div>
  );
};

export default IdentityCard;
