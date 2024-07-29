// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUvC0ym7XQAKln0zLmiX-_tbugpdh8WlQ",
  authDomain: "hspantryapp-7f83f.firebaseapp.com",
  projectId: "hspantryapp-7f83f",
  storageBucket: "hspantryapp-7f83f.appspot.com",
  messagingSenderId: "649906267946",
  appId: "1:649906267946:web:518f8269628c465c736053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {
  app,
  firestore
}