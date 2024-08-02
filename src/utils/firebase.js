// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9XbP6yCOMhBSI2AAZUuz2rF1V8EZI6Kg",
  authDomain: "netflixgpt-2ef1d.firebaseapp.com",
  projectId: "netflixgpt-2ef1d",
  storageBucket: "netflixgpt-2ef1d.appspot.com",
  messagingSenderId: "485798849378",
  appId: "1:485798849378:web:36646e7f3eee630f16da3b",
  measurementId: "G-9L2EN9ZZ4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();