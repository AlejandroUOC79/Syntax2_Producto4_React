import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBq5wShYV-RRXaY-EWza-DoMZFiJR9Jxgw",
  authDomain: "uoc-codea.firebaseapp.com",
  projectId: "uoc-codea",
  storageBucket: "uoc-codea.firebasestorage.app",
  messagingSenderId: "681589601697",
  appId: "1:681589601697:web:2bfc784f3b2bcc87b247e0",
  measurementId: "G-MYG22B7N94"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);