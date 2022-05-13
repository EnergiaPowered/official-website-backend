// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);

const { REACT_APP_VAPID_KEY } = process.env;

export const getPermessionToken = async (setTokenFound) => {
  let currentToken = "";
  try {
    currentToken = await getToken(messaging, { vapidKey: REACT_APP_VAPID_KEY });
    if (!currentToken) return;
    setTokenFound(true);
  } catch (error) {
    console.error("an error occured while retrieving token!", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
