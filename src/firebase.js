import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC0pGMzeGqmpvbArgk70TCEav44yCJcOS4",
    authDomain: "tech-now-60ecf.firebaseapp.com",
    projectId: "tech-now-60ecf",
    storageBucket: "tech-now-60ecf.appspot.com",
    messagingSenderId: "990399064304",
    appId: "1:990399064304:web:ca479214c09d2565b8fa35",
    measurementId: "G-411W03N7R8"
};

const app = initializeApp(firebaseConfig);

// Exporta los servicios necesarios para la aplicación
export const googleProvider = new GoogleAuthProvider(); // Proveedor para autenticación con Google
export const db = getFirestore(app); // Base de datos Firestore
export const auth = getAuth(app); // Autenticación principal
export const emailAuthProvider = EmailAuthProvider; // Reautenticación en eliminación de cuenta