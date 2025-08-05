import * as admin from 'firebase-admin';


// initialize firebase admin sdk
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID, 
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});
const firebaseAdmin = admin;


export { firebaseAdmin };
