// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,GithubAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCod1Tb2min_utI9leWL4oBZFSLSLAtTAk",
  authDomain: "hi-one-dcf92.firebaseapp.com",
  projectId: "hi-one-dcf92",
  storageBucket: "hi-one-dcf92.appspot.com",
  messagingSenderId: "349183445386",
  appId: "1:349183445386:web:052f5dea4ae02e8c3ee073",
  measurementId: "G-8Z9W8Y4RHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const GoogleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()
export {auth,GoogleProvider,githubProvider}
