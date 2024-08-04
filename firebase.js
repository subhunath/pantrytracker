// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAN92m_c4koUDoUysLkxNQPBLOkrtqRK8",
  authDomain: "pantrytracker-cfc39.firebaseapp.com",
  projectId: "pantrytracker-cfc39",
  storageBucket: "pantrytracker-cfc39.appspot.com",
  messagingSenderId: "1024733304754",
  appId: "1:1024733304754:web:e2813de08d75dd01a8b6ab",
  measurementId: "G-TCPL357JDR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };