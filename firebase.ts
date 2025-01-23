// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-R83cyiKesDv4YIYp8jCfANcTWwk_RR4",
  authDomain: "chatbot-ad1aa.firebaseapp.com",
  projectId: "chatbot-ad1aa",
  storageBucket: "chatbot-ad1aa.firebasestorage.app",
  messagingSenderId: "889470137369",
  appId: "1:889470137369:web:074056aaacf1907b002688",
  measurementId: "G-SBVQEK4ZLY"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
