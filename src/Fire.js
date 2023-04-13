
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
//import * as firebase from 'firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZHnt63E-rWnq4LVhjp1KUlFlmiluR8ZY",
    authDomain: "retouched-22401.firebaseapp.com",
    projectId: "retouched-22401",
    storageBucket: "retouched-22401.appspot.com",
    messagingSenderId: "524510035567",
    appId: "1:524510035567:web:84311a97bec65616d5979a",
    measurementId: "G-47KG08HZCD"
  };

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export const analytics = getAnalytics(fire);
export const auth = getAuth(fire);

