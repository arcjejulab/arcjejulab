// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
