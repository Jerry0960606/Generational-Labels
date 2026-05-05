import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDuMiWuirX2LhujammlMPLBPMpUs4nevxE",
  authDomain: "generational-label.firebaseapp.com",
  projectId: "generational-label",
  storageBucket: "generational-label.firebasestorage.app",
  messagingSenderId: "84560555977",
  appId: "1:84560555977:web:cad9158d0034935dff0218",
  measurementId: "G-YRLJJ1J9KJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
