// ─── Firebase Configuration ───
// Replace the placeholder values below with your actual Firebase project config.
// You can find this in: Firebase Console → Project Settings → General → Your apps → SDK config

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAXkfC5YaEOBDD_5dErR7Lo8L31arL-2oA",
    authDomain: "sahara-ai-1a065.firebaseapp.com",
    projectId: "sahara-ai-1a065",
    storageBucket: "sahara-ai-1a065.firebasestorage.app",
    messagingSenderId: "487460937386",
    appId: "1:487460937386:web:d01719067637963e01fad3",
    measurementId: "G-Q4KNYY1NBR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
