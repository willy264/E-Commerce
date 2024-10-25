// from firebase site, it was given

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbxzlUq5hhiuDbumXHZaPg9vTSS--DRNQ",
  authDomain: "ecommerce-2f855.firebaseapp.com",
  projectId: "ecommerce-2f855",
  storageBucket: "ecommerce-2f855.appspot.com",
  messagingSenderId: "184235673063",
  appId: "1:184235673063:web:149f2f39f054d8fa676942"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()