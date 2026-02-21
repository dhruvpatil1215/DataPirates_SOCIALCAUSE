import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXkfC5YaEOBDD_5dErR7Lo8L31arL-2oA",
  authDomain: "sahara-ai-1a065.firebaseapp.com",
  projectId: "sahara-ai-1a065",
  storageBucket: "sahara-ai-1a065.firebasestorage.app",
  messagingSenderId: "487460937386",
  appId: "1:487460937386:web:06ca1c5f9643cb4301fad3",
  measurementId: "G-787MT2Q22M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword };
