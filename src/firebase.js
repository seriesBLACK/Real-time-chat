import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDoI3IqOOHQqX7Fk6H5Zo-j-SeBTE6k-iU",
    authDomain: "chat-app-97ad2.firebaseapp.com",
    projectId: "chat-app-97ad2",
    storageBucket: "chat-app-97ad2.appspot.com",
    messagingSenderId: "251857932576",
    appId: "1:251857932576:web:0b91502cad83ff062e0745"
};
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const provider = new GoogleAuthProvider();