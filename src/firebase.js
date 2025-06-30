// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfceUS4mvYsDBRWlU3hz8XOIjBwbAEjpI",
  authDomain: "maulanazahideducationaltrust.firebaseapp.com",
  projectId: "maulanazahideducationaltrust",
  storageBucket: "maulanazahideducationaltrust.firebasestorage.app",
  messagingSenderId: "50588012242",
  appId: "1:50588012242:web:ef4c2930913ac87199270b",
  measurementId: "G-N3V9191FVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);