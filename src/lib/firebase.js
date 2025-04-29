// src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBnvISpigqkZ6aBe7D6emTjnGMKjh7hli4",
    authDomain: "ssk-port.firebaseapp.com",
    projectId: "ssk-port",
    storageBucket: "ssk-port.firebasestorage.app",
    messagingSenderId: "18307451979",
    appId: "1:18307451979:web:5610fbfd954645c3c211ce",
    measurementId: "G-J7SL77ZSNG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
