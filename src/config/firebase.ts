import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import * as admin from 'firebase-admin';
import * as serviceAccount from './minsapoint-firebase-adminsdk-fbsvc-645f338780.json';


// .env 파일에 빼놓기

// initialize client sdk(frontend?)
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
const firebaseAuth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);


// initialize firebase admin sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
const firebaseAdmin = admin;


export { firebaseAuth, db, storage, firebaseAdmin };
