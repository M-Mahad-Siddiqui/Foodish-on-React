  // Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


  // const firebaseConfig = {
  //   apiKey           : "AIzaSyCaY3zLtv7mXOu4AmZ5zUZhBz1cOVKgSFs",
  //   authDomain       : "testing-fa414.firebaseapp.com",
  //   projectId        : "testing-fa414",
  //   storageBucket    : "testing-fa414.appspot.com",
  //   messagingSenderId: "780337723672",
  //   appId            : "1:780337723672:web:754149babf252c54d5866d",
  //   measurementId    : "G-7TZEZQT7DE"
  // };
  // const firebaseConfig = {
  //   apiKey: "AIzaSyAr2R1sryYvVbSNdplyeKYrIHHZ6D0uZyc",
  //   authDomain: "calcium-pod-256305.firebaseapp.com",
  //   projectId: "calcium-pod-256305",
  //   storageBucket: "calcium-pod-256305.appspot.com",
  //   messagingSenderId: "182256618793",
  //   appId: "1:182256618793:web:c3c627824b1c28feea3b38",
  //   measurementId: "G-3R2S7KYERZ",
  // };
const firebaseConfig = {
  apiKey: "AIzaSyBGkFWxj__ZTdIoSlYujN0krUK7xotE8KQ",
  authDomain: "foodies-7731d.firebaseapp.com",
  projectId: "foodies-7731d",
  storageBucket: "foodies-7731d.appspot.com",
  messagingSenderId: "198893075889",
  appId: "1:198893075889:web:ac78f65d00114d016c1190",
  measurementId: "G-T62TT8BT9J"
};
// Initialize Firebase
const app       = initializeApp(firebaseConfig);
const db        = getFirestore(app);
const storage   = getStorage(app);
const auth      = getAuth(app);
const analytics = getAnalytics(app);

export { analytics, auth, db, storage }; // export default app;
