import React, { useState, useEffect } from "react";
import "./style.css";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ContactForm(props) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [message, setMessage] = useState({ value: "", error: "" });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /**
   * Validate the field 
   * 
   * @param {string} field 
   */
  function validate(field) {
    switch (field) {
      case "name":
        if (name.value.trim() === "")
          setName({
            value: name.value,
            error: "This field is required"
          });
        else {
          setName({
            value: name.value.trim(),
            error: ""
          });
          return true;
        }
        break;
      case "email":
        if (email.value.trim() === "")
          setEmail({
            value: email.value.trim(),
            error: "This field is required"
          });
        else if (!EMAIL_REGEX.test(email.value))
          setEmail({
            value: email.value.trim(),
            error: "Please enter a valid email"
          });
        else {
          setEmail({
            value: email.value.trim(),
            error: ""
          });
          return true;
        }
        break;
      case "message":
        if (message.value.trim() === "")
          setMessage({
            value: message.value.trim(),
            error: "This field is required"
          });
        else {
          setMessage({
            value: message.value.trim(),
            error: ""
          });
          return true;
        }
        break;
      default:
        return;
    }
    return false;
  }

  /**
   * Validate all fields
   */
  function validateAll() {
    let isValid = true;
    //This repetition is to avoid the default short-circuit evaluation of the logic AND
    isValid &= validate("name");
    isValid &= validate("email");
    isValid &= validate("message");
    return isValid;
  }



  /**
   * Change the values of the states on change
   * 
   * @param {object} e 
   */
  function changeHandler(e) {
    name.value = e.currentTarget.name.value;
    email.value = e.currentTarget.email.value;
    message.value = e.currentTarget.message.value;
    validate(e.target.id);
  }

  /**
   * Submit to the backend if the fields are valid
   * 
   * @param {object} e 
   */
  function submitHandler(e) {
    e.preventDefault();
    if (validateAll()) {
      props.onSubmit(name.value, email.value, message.value);
    }
  }

  return (
    <article className="bg-section" id="contact-form">
      <h2 className="section-title text-center">Leave a message</h2>
      <form
        onChange={changeHandler}
        onSubmit={submitHandler}
        noValidate
      >
        <div className="flex-row-2">
          <div className="box">
            <label htmlFor="name">
              Name{" "}
              <span className="sup-span">
                <sup>*</sup>
              </span>
            </label>
            <input type="text" name="name" id="name" />
            {name.error && <p className="error-message">{name.error}</p>}
          </div>
          <div className="box">
            <label htmlFor="email">
              Email{" "}
              <span className="sup-span">
                <sup>*</sup>
              </span>
            </label>
            <input type="text" name="email" id="email" />
            {email.error && <p className="error-message">{email.error}</p>}
          </div>
          <div className="box">
            <label htmlFor="message">
              Your Message{" "}
              <span className="sup-span">
                <sup>*</sup>
              </span>
            </label>
            <textarea name="message" id="message"></textarea>
            {message.error && <p className="error-message">{message.error}</p>}
          </div>
        </div>
        <input type="submit" value="SEND" />
      </form>
    </article>
  );
}
