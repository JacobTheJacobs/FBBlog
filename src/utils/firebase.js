import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYgRwfY-zhO-GFcJiiCo8iKBo4KJrck9M",
  authDomain: "j-blog-d7037.firebaseapp.com",
  databaseURL: "https://j-blog-d7037.firebaseio.com",
  projectId: "j-blog-d7037",
  storageBucket: "j-blog-d7037.appspot.com",
  messagingSenderId: "1086168766719",
  appId: "1:1086168766719:web:e9cd25886c6d1d911454ca",
  measurementId: "G-W4G56BDLGT",
};

export const FBaseApp = firebase.initializeApp(firebaseConfig);

export const DB = FBaseApp.firestore();
export const { Timestamp } = firebase.firestore;
export const usersCollection = DB.collection("users");
