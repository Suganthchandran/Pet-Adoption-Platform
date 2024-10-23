import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC8i6NLCxLiORmSl7lgLtZhxp1J58X-c5M",
  authDomain: "pet-adoption-platform-ca0c3.firebaseapp.com",
  projectId: "pet-adoption-platform-ca0c3",
  storageBucket: "pet-adoption-platform-ca0c3.appspot.com",
  messagingSenderId: "388420348627",
  appId: "1:388420348627:web:9fd207d2abc8894da38226"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;