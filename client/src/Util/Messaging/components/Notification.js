import React, { useState, useEffect } from "react";
import { getPermessionToken } from "../../../firebaseInit";
import axios from "axios";
import config from "globals/config";

const Notification = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("token found ", isTokenFound);

  useEffect(() => {
    let data;

    const tokenFunction = async () => {
      data = await getPermessionToken(setTokenFound);
      if (data) {
        console.log("token is", data);
        axios.post(`${config.HOST}/notification/token`);
      }
      return data;
    };
    tokenFunction();
  }, [setTokenFound]);

  return <></>;
};

export default Notification;

// export const Messaging = () => {
//   const [messages, setMessages] = useState([]);
//   const [requesting, setRequesting] = useState(false);
//   //   const baseURL =
//   //     process.env.NODE_ENV === "development"
//   //       ? "http://localhost:4000"
//   //       : "https://energia21.herokuapp.com";

//   console.log("token found :", isTokenFound);
//   useEffect(() => {
//     setRequesting(true);
//     let data;
//     const tokenFn = async () => {
//       data = await getToken(setTokenFound);
//       if (data) {
//         console.log("token is ", data);
//       }
//       return data;
//     };
//     //   axios.get(`${baseURL}/messages`).then((resp) => {
//     //     setMessages(resp.data.messages);
//     //     setRequesting(false);
//     //   });
//     tokenFn();
//   }, [setTokenFound]);

//   return (
//     <Container>
//       {/* form goes here */}
//       <div className="message-list">
//         <h3>Messages</h3>
//         {requesting ? (
//           <Spinner animation="border" role="status">
//             <span className="sr-only">Loading...</span>
//           </Spinner>
//         ) : (
//           <>
//             {messages.map((m, index) => {
//               const { name, message } = m;
//               return (
//                 <div key={index}>
//                   {name}: {message}
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     </Container>
//   );
// };
// export const requestFirebaseNotificationPermission = async (setTokenFound) => {
//   let currentToken = "";
//   try {
//     currentToken = await messaging.getToken({ vapidKey: REACT_APP_VAPID_KEY });
//     if (!currentToken) return;
//     setTokenFound(true);
//   } catch (error) {
//     console.error("an error occured while retrieving token!", error);
//   }
// };
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });
