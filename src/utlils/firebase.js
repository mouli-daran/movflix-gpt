// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCboZWkyD3mywmg7ltSLDMmYDCimql5Xkk",
  authDomain: "movflix-d540f.firebaseapp.com",
  projectId: "movflix-d540f",
  storageBucket: "movflix-d540f.appspot.com",
  messagingSenderId: "976816473821",
  appId: "1:976816473821:web:b8619b11332ea7b21bbd34",
  measurementId: "G-1NYWV52M07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
