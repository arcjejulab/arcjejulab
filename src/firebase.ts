import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAzrj1ItQU3eXUqXiwRoCFbq_hbioPbxSw",
  authDomain: "allrounder-admi.firebaseapp.com",
  projectId: "allrounder-admi",
  storageBucket: "allrounder-admi.firebasestorage.app",
  messagingSenderId: "731726433487",
  appId: "1:731726433487:web:f8f336f77449f343137bba",
  measurementId: "G-259H8JXTGG"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export { app, auth, db };
