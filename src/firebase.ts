// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzrj1ItQU3eXUqXiwRoCFbq_hbioPbxSw",
  authDomain: "allrounder-admi.firebaseapp.com",
  projectId: "allrounder-admi",
  storageBucket: "allrounder-admi.firebasestorage.app",
  messagingSenderId: "731726433487",
  appId: "1:731726433487:web:f8f336f77449f343137bba",
  measurementId: "G-259H8JXTGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Analytics only when supported
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export { app, auth };
