import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBLI-faZeA-qrI3zD0QXkwv8kMvSNIm4QM",
  authDomain: "practice-1c2cd.firebaseapp.com",
  projectId: "practice-1c2cd",
  storageBucket: "practice-1c2cd.firebasestorage.app",
  messagingSenderId: "886840075778",
  appId: "1:886840075778:web:e4636e83acdf51066b291b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
