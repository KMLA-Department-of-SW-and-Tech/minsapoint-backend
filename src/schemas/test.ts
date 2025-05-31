import { collection, addDoc } from "firebase/firestore";
import { db } from '../../src/config/firebase';

addDoc(collection(db, "test"), {
  message: "Hello Firebase!"
});
