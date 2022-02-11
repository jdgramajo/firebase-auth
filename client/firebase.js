import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "auth-b6cff.firebaseapp.com",
  projectId: "auth-b6cff",
  storageBucket: "auth-b6cff.appspot.com",
  messagingSenderId: "899003062393",
  appId: "1:899003062393:web:821eb5bb486ecb750edca8",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
