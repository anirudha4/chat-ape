import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyAXNhWl_3H54ydmQeH02vnUgNqbyzIlEMc",
  authDomain: "chat-ape.firebaseapp.com",
  projectId: "chat-ape",
  storageBucket: "chat-ape.appspot.com",
  messagingSenderId: "426448244989",
  appId: "1:426448244989:web:cf36b650f4092096e36e94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


export { auth, app, provider, db };