import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkHt1rB_gTHS6GJDUhJoPuUEWjq3EJAE8",
    authDomain: "flight-ticket-booking-8a9da.firebaseapp.com",
    projectId: "flight-ticket-booking-8a9da",
    storageBucket: "flight-ticket-booking-8a9da.firebasestorage.app",
    messagingSenderId: "785319680299",
    appId: "1:785319680299:web:f7d79fb9722d1b4baccd6e",
    measurementId: "G-BD4PQJN85L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
