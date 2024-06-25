import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXEpEEn950PQhLD1lsyFc0Vtwkqjj0oNk",
  authDomain: "minichat-40190.firebaseapp.com",
  projectId: "minichat-40190",
  storageBucket: "minichat-40190.appspot.com",
  messagingSenderId: "234634260302",
  appId: "1:234634260302:web:4d57385a19f4aed2e7b81f",
  measurementId: "G-FZHH5R8E5S"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export {app};