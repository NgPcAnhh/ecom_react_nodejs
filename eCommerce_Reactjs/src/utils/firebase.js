import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: "AIzaSyDbtSfdoC4DrEMwBG_KiXYCoyfh4TvvUfE",
  authDomain: "pcanh-tmdt.firebaseapp.com",
  projectId: "pcanh-tmdt",
  storageBucket: "pcanh-tmdt.firebasestorage.app",
  messagingSenderId: "141143417135",
  appId: "1:141143417135:web:6fbb609c8e728a26dd01da",
  measurementId: "G-BWPSZMEXCR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase;
export const authentication = getAuth(initializeApp(firebaseConfig))