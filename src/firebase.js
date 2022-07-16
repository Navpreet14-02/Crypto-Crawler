import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from "./Config/firebaseConfig";


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp); // To initialize our authorization

const db = getFirestore(firebaseApp);// To initialize our database.

export { auth, db };