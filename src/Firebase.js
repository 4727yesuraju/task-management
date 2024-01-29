// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvTfwDsCLiDrnFDmoWWiaHCPC0dsBPtd4",
  authDomain: "task-e2a4f.firebaseapp.com",
  projectId: "task-e2a4f",
  storageBucket: "task-e2a4f.appspot.com",
  messagingSenderId: "102987763839",
  appId: "1:102987763839:web:bbecf82493e334f7dd6f4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);