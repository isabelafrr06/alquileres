// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk8VFRknqBUskak31GNWu6VC4657w-_Wo",
  authDomain: "alquileres-rodriguez.firebaseapp.com",
  projectId: "alquileres-rodriguez",
  storageBucket: "alquileres-rodriguez.appspot.com",
  messagingSenderId: "431281430238",
  appId: "1:431281430238:web:e8b9ee4f8f03ef58782c4f",
  measurementId: "G-JFX74VWK2P"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore();