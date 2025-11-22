// js/menu.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from './firebase-init.js';

let currentUser = null;

// Listen to login status
onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

// Get item details from card
function getItemDetails(card) {
  return {
    title: card.querySelector('h3').textContent,
    desc: card.querySelector('p').textContent,
    image: card.querySelector('img').getAttribute('src'),
    price: parseInt(card.getAttribute('data-price')) || 0,  // 💰 Make sure price is a number
    quantity: 1
  };
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartCounter() {
  const cartCount = document.querySelector('.cart-count');
  const cartItems = getCart();
  let totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0); // 👈 Show total quantity

  if (cartCount) {
    cartCount.textContent = totalQty;
    cartCount.style.display = totalQty > 0 ? 'inline-block' : 'none';
  }
}

// Hook buttons on all cards
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.menu-card').forEach(card => {
      const addBtn = card.querySelector('.add-btn');
      const removeBtn = card.querySelector('.remove-btn');

      addBtn.addEventListener('click', () => {
        if (!currentUser) {
          alert("Please log in to add items to your cart.");
          window.location.href = "login.html";
          return;
        }

        const item = getItemDetails(card);
        console.log("🧪 Price found for", item.title, "→", card.getAttribute("data-price"));
        console.log("🧪 Item added:", item);

        const cart = getCart();
        const existingItem = cart.find(i => i.title === item.title);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push(item);
        }

        saveCart(cart);
        updateCartCounter();
        alert(`${item.title} added to cart!`);
      });

      removeBtn.addEventListener('click', () => {
        const item = getItemDetails(card);
        let cart = getCart();

        const existingItem = cart.find(i => i.title === item.title);
        if (existingItem) {
          if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
          } else {
            cart = cart.filter(i => i.title !== item.title);
          }

          saveCart(cart);
          updateCartCounter();
          alert(`${item.title} updated/removed from cart.`);
        } else {
          alert(`${item.title} is not in your cart.`);
        }
      });
    });

    updateCartCounter();
  }, 200); // Delay for DOM to fully load data attributes
});
