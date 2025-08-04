import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5ySlY2jnM5TQwFR7qJdfrLVwP0R3__aM",
  authDomain: "linkedin-29175.firebaseapp.com",
  projectId: "linkedin-29175",
  storageBucket: "linkedin-29175.firebasestorage.app",
  messagingSenderId: "951374608412",
  appId: "1:951374608412:web:a6356d62acae05056247d9",
  measurementId: "G-VP8Y3XECF2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
