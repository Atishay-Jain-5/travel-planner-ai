// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFZJ8M2CNkeSbUMqOUEHpy5zDeiHVdj0Q",
  authDomain: "travel-planner-ai-5194a.firebaseapp.com",
  projectId: "travel-planner-ai-5194a",
  storageBucket: "travel-planner-ai-5194a.appspot.com",
  messagingSenderId: "555070363559",
  appId: "1:555070363559:web:93b2e92840d45f77ec4882",
  measurementId: "G-Y3HZJ9NHK6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);