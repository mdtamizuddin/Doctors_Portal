// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvLY3CLgp8JTY7Bvvc2M4Sqe5roHLBDVM",
  authDomain: "m-t-portfolio.firebaseapp.com",
  projectId: "m-t-portfolio",
  storageBucket: "m-t-portfolio.appspot.com",
  messagingSenderId: "222995145203",
  appId: "1:222995145203:web:cd4ad878aa121f4a9db286",
  measurementId: "G-TMVWE5E835"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
