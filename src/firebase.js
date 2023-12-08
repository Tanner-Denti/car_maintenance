// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2L-Wduwpw-mFITgR4Glx2An6IEAnx7-A",
  authDomain: "senior-project-8f6de.firebaseapp.com",
  projectId: "senior-project-8f6de",
  storageBucket: "senior-project-8f6de.appspot.com",
  messagingSenderId: "970715332020",
  appId: "1:970715332020:web:649d332dc6dde5de2d06e1",
  measurementId: "G-1KTJ5WEHPZ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

