importScripts("https://www.gstatic.com/firebasejs/8.4.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDDZrEGrE7fc3rcONQ2HnxL1RWwrgpx7ds",
  authDomain: "energiaapp-3eaa3.firebaseapp.com",
  databaseURL: "https://energiaapp-3eaa3.firebaseio.com",
  projectId: "energiaapp-3eaa3",
  storageBucket: "energiaapp-3eaa3.appspot.com",
  messagingSenderId: "1068816673794",
  appId: "1:1068816673794:web:a7146829d96c870ae54b1b",
  measurementId: "G-8VX0SY1MVS",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// self.addEventListener('notificationclick', event => {
//   console.log(event)
//   return event;
// });
