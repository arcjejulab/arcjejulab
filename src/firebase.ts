import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 파이어베이스 프로젝트 설정값
const firebaseConfig = {
  apiKey: "AIzaSyArv8j1o77v4_vY0u6oDq_m7I3H0l4vQ4",
  authDomain: "allroundercoffeelab.firebaseapp.com",
  projectId: "allroundercoffeelab",
  storageBucket: "allroundercoffeelab.appspot.com",
  messagingSenderId: "38515029415",
  appId: "1:38515029415:web:86e2467d3637648358482d",
  measurementId: "G-815Q47291B"
};

// 시스템 초기화
const app = initializeApp(firebaseConfig);

// 보안 인증 및 데이터베이스 엔진 내보내기
export const auth = getAuth(app);
export const db = getFirestore(app);
