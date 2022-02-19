import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "antd";
import { addUser } from "../services/register.services";
import "../style.css";
import authHeader from "globals/auth-header";
import Page1 from "./page1";
import Page2 from "./page2";

function Register() {
  const loggedIn = Object.keys(authHeader()).length ? true : false;

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();
  const [page,setPage]=useState(0);
  const PageDisp = ()=>{
    if (page===0) {
      return <><Page1/><div style={{display:"none"}}><Page2 /></div> </>
    }
    else{
      return <><div style={{display:"none"}}><Page1/></div> <Page2 /></>
    }
  }

  const SignupButton = ()=>{
    if (page===1){
      return (<Form.Item className="register-submit">
                  <Button type="secondry" htmlType="submit" size="large">
                    Sign Up
                  </Button>
        </Form.Item>);
              
    }
  }

  const ButtonChange = ()=>{
    if (page===1){
      return (<Form.Item className="register-submit">
                  <Button onClick={()=>{setPage((currPage)=>currPage-1)}} type="secondry" size="large">
                    Back
                  </Button>
        </Form.Item>)
       ;          
    }
    else {
      return (<Form.Item className="register-submit">
                <Button onClick={()=>{setPage((currPage)=>currPage+1)}} type="secondry" size="large">
                  Next
                </Button>
      </Form.Item>)
    ;
    }
  }
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
              <div>
                {PageDisp()}
              </div>
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
                  {ButtonChange()}
                  {SignupButton()}
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
