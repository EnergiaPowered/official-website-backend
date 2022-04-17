const FCM = require("fcm-node");

async function notify(topic, msgTitle, msgBody) {
  try {
    const fcm = new FCM(SERVER_KEY); //server key of firebase db (can be found in firebase console)

    let message = {
      to: "/topics" + topic,
      notification: {
        title: msgTitle,
        body: msgBody,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
        icon: "fcm_push_icon",
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
