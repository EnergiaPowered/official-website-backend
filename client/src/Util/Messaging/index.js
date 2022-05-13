import React, { useState } from "react";
import Notification from "./components/Notification";
import NotificationUI from "./components/NotificationUI";
import { onMessageListener } from "../../firebaseInit";

const Messeging = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  console.log(show, notification);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((e) => console.error(e));

  return (
    <>
      {show ? (
        <NotificationUI title={notification.title} body={notification.body} />
      ) : (
        <></>
      )}
      <Notification />
    </>
  );
};

export default Messeging;
