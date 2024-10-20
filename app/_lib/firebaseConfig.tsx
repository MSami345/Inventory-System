import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDdNZgVCvD-_C_eWJ8YhpmIpFjnElFkpJE",
  authDomain: "inventory-system-89e81.firebaseapp.com",
  databaseURL: "https://inventory-system-89e81-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "inventory-system-89e81",
  storageBucket: "inventory-system-89e81.appspot.com",
  messagingSenderId: "110334524000",
  appId: "1:110334524000:web:4f30feac4503edfb5f2105"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const provider: GoogleAuthProvider = new GoogleAuthProvider()
const db: Database = getDatabase(app);
const auth: Auth = getAuth()

export { app, db, auth, provider };
