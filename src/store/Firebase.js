import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDPeIX5g7obxSU2MwPQWByYkBf_Axwq9K0",
    authDomain: "expensetracker-bbbdb.firebaseapp.com",
    projectId: "expensetracker-bbbdb",
    storageBucket: "expensetracker-bbbdb.appspot.com",
    messagingSenderId: "304863959714",
    appId: "1:304863959714:web:a3d9820218960cb5cc15fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
