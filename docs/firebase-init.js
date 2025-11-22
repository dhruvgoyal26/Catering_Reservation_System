// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCJ0Axn7Dtnhw7oQbcgYazswCkkcP96cW0",
  authDomain: "catering-system2.firebaseapp.com",
  projectId: "catering-system2",
  storageBucket: "catering-system2.firebasestorage.app",
  messagingSenderId: "233759899340",
  appId: "1:233759899340:web:e79a2cb902163e98e94c69",
  measurementId: "G-7DVSGCLCDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

