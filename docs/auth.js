// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from './firebase-init.js';

// Signup Logic
document.getElementById('signup-btn')?.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup successful!");
      window.location.href = "index.html"; // Redirect to homepage
    })
    .catch(err => alert("Signup failed: " + err.message));
});

// Login Logic
document.getElementById('login-btn')?.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "index.html"; // Redirect after login
    })
    .catch(err => alert("Login failed: " + err.message));
});
