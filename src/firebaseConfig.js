import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC2YYPFYAVrm_7JwAu9WDXT2k22C0ffz4",
  authDomain: "todo-app-736c1.firebaseapp.com",
  projectId: "todo-app-736c1",
  storageBucket: "todo-app-736c1.appspot.com",
  messagingSenderId: "721268800245",
  appId: "1:721268800245:web:cb9383cffc959f139a23bc",
  measurementId: "G-VZKN2HSFW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  // Initialize Authentication

export { db, auth, addDoc, getDocs, doc, updateDoc, deleteDoc, collection, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
