import React from "react";
import { ToastContainer, toast } from "react-toastify";

const NotificationUI = ({ title, body }) => {
  toast.info(
    <div>
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  );
  return <ToastContainer />;
};

export default NotificationUI;
