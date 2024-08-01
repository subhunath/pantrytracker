// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMnypGJ9gB92LOng9HYIepwqdqHHfLimc",
  authDomain: "pantry-tracker-6ab5f.firebaseapp.com",
  projectId: "pantry-tracker-6ab5f",
  storageBucket: "pantry-tracker-6ab5f.appspot.com",
  messagingSenderId: "1064320011791",
  appId: "1:1064320011791:web:28bbf7618dbc2a46f01d7a",
  measurementId: "G-D57TS9R6HZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };