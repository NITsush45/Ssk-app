// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBnvISpigqkZ6aBe7D6emTjnGMKjh7hli4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ssk-port.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ssk-port",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ssk-port.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "18307451979",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:18307451979:web:5610fbfd954645c3c211ce"
};


let firebaseApp;
let auth;
let db;

// Initialize Firebase only on the client side
if (typeof window !== "undefined") {
  firebaseApp = initializeApp(clientConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
}

export { auth, db };
export default firebaseApp;