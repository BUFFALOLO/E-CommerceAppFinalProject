import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9--jSGOrwTTB9dL9AP-0aLCc8EC75eJY",
  authDomain: "e-commerce-app-with-fire-d2afa.firebaseapp.com",
  projectId: "e-commerce-app-with-fire-d2afa",
  storageBucket: "e-commerce-app-with-fire-d2afa.firebasestorage.app",
  messagingSenderId: "505029245891",
  appId: "1:505029245891:web:3ae65a7218e50105995b76",
  measurementId: "G-7MMMCTLS7W"
};

// Initialize Firebase
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (error) {
    console.error("Firebase initialization error:", error);
    throw new Error("Failed to initialize Firebase. Please check your configuration.");
}

// Initialize Firebase Authentication and Firestore and export them
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
