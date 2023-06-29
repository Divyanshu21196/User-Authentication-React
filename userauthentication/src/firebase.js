// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBemiQLoO471GaHWLLWIqaQxXqozLXXQCk",
  authDomain: "user-authentication-8bab3.firebaseapp.com",
  projectId: "user-authentication-8bab3",
  storageBucket: "user-authentication-8bab3.appspot.com",
  messagingSenderId: "669111691723",
  appId: "1:669111691723:web:292ef482a0b87f3d4d2e4e",
  measurementId: "G-FBT6DLFC5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {app,auth}