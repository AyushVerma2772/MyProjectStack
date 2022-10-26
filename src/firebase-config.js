import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAjEou0nmOtwHVXtcPSmSJbLy9BnthXpOw",
    authDomain: "myprojectstack.firebaseapp.com",
    projectId: "myprojectstack",
    storageBucket: "myprojectstack.appspot.com",
    messagingSenderId: "474146873841",
    appId: "1:474146873841:web:be543a40bb6233ec002450"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();