import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase.js';

addDoc(collection(db, "test"), {
  message: "Hello Firebase!"
});
