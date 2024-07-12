// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi5lKmCbsdzIEQ3YIc0Hn4z9juBE4DES0",
  authDomain: "medimodule.firebaseapp.com",
  databaseURL: "https://medimodule-default-rtdb.firebaseio.com",
  projectId: "medimodule",
  storageBucket: "medimodule.appspot.com",
  messagingSenderId: "580485646721",
  appId: "1:580485646721:web:a1d955fbb65dbf30ff8080",
  measurementId: "G-YW4XTPC1HT"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);



// Initialize Firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// export const auth = firebase.auth(); // Export Firebase Authentication instance
export { db, app, auth }