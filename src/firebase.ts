// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAcIlHJgyGyAW-DhwVprsBB5t5ddPxKIt4",
  authDomain: "couple-celebration.firebaseapp.com",
  projectId: "couple-celebration",
  storageBucket: "couple-celebration.firebasestorage.app",
  messagingSenderId: "278314503617",
  appId: "1:278314503617:web:1083303ea28f0082d27340"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Database (Firestore) and Storage services
export const db = getFirestore(app)
export const storage = getStorage(app)