// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdNZgVCvD-_C_eWJ8YhpmIpFjnElFkpJE",
  authDomain: "inventory-system-89e81.firebaseapp.com",
  projectId: "inventory-system-89e81",
  storageBucket: "inventory-system-89e81.appspot.com",
  messagingSenderId: "110334524000",
  appId: "1:110334524000:web:4f30feac4503edfb5f2105",
  databaseURL:
    "https://inventory-system-89e81-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Database = getDatabase(app);

export { app, db };
