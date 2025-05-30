import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDY_5PQ8BppsTf_I2vqMoDRyq3CMZKUE7U",
  authDomain: "minsapoint.firebaseapp.com",
  projectId: "minsapoint",
  storageBucket: "minsapoint.firebasestorage.app",
  messagingSenderId: "456076951299",
  appId: "1:456076951299:web:5c1fd042ef230daa4c3336",
  measurementId: "G-XXSDMFK9RT"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { auth, db, storage };
