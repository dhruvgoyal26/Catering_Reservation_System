// js/main.js

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from './firebase-init.js';

let currentUser = null;

// Listen for login/logout state
onAuthStateChanged(auth, (user) => {
  currentUser = user;

  const loginLink = document.getElementById('login-link');
  if (loginLink) {
    if (user) {
      loginLink.textContent = 'Logout';
      loginLink.href = '#';
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
          alert("Logged out!");
          window.location.href = "index.html";
        });
      });
    } else {
      loginLink.textContent = 'Login';
      loginLink.href = 'login.html';
    }
  }

  updateCartCounter(); // 🔁 always update cart count on auth change
});

// Cart counter updater
function updateCartCounter() {
  const counterSpan = document.querySelector('.cart-count');
  let cartItems = [];

  try {
    const rawCart = localStorage.getItem('cart');
    cartItems = rawCart ? JSON.parse(rawCart) : [];
  } catch (e) {
    cartItems = [];
  }

  if (counterSpan) {
    counterSpan.textContent = cartItems.length;
    counterSpan.style.display = cartItems.length > 0 ? 'inline-block' : 'none';
  }
}

// Also run on page load
window.addEventListener('load', updateCartCounter);
