import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "portal-anuncios-f845e.firebaseapp.com",
  projectId: "portal-anuncios-f845e",
  storageBucket: "portal-anuncios-f845e.appspot.com",
  messagingSenderId: "332994389694",
  appId: process.env.FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }
