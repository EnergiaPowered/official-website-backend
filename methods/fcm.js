const FCM = require("fcm-node");
const NotificationToken = require("../models/NotificationToken");
const { initializeApp } = require("firebase/app");
const { getMessaging } = require("firebase/messaging");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function notify(topic, msgTitle, msgBody) {
  try {
    // These registration tokens come from the client FCM SDKs.
    allTokens = await NotificationToken.find();
    const registrationTokens = allTokens.map((item) => {
      return item["token"];
    });

    // Subscribe the devices corresponding to the registration tokens to the
    // topic.
    getMessaging(app)
      .subscribeToTopic(registrationTokens, topic)
      .then((response) => {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        console.log("Successfully subscribed to topic:", response);
      })
      .catch((error) => {
        console.log("Error subscribing to topic:", error);
      });
    const fcm = new FCM("SERVER_KEY"); //server key of firebase db (can be found in firebase console)

    let message = {
      to: "/topics" + topic,
      notification: {
        title: msgTitle,
        body: msgBody,
        sound: "default",
      },
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!");
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = notify;
