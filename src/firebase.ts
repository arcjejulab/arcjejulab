import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// 사장님의 설정값 (사진에 있는 내용 그대로 유지하세요)
const firebaseConfig = {
  apiKey: "AIzaSy...", 
  authDomain: "allrounder-admi.firebaseapp.com",
  projectId: "allrounder-admi",
  storageBucket: "allrounder-admi.firebasestorage.app",
  messagingSenderId: "731726433487",
  appId: "1:731726433487:web:f8f336f77449f343137bba",
  measurementId: "G-259H8JXTGG"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 인증(Auth) 및 장부(DB) 객체 생성
const auth = getAuth(app);
const db = getFirestore(app); //

// 애널리틱스 설정 (기존 코드 유지)
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

// 외부에서 쓸 수 있게 내보내기
export { app, auth, db }; //
