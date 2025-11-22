// cart.js

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from './firebase-init.js';

// Helpers to get/save cart
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Render Cart
function renderCart() {
  const cartContainer = document.getElementById('cartItems');
  const cartItems = getCart();

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p style="text-align:center; font-size:18px;">Your cart is empty 😢</p>';
    return;
  }

  cartContainer.innerHTML = '';
  let grandTotal = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    grandTotal += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div class="item-details">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <p><strong>Price:</strong> ₹${item.price}</p>
        <div style="display:flex; align-items:center; gap:10px;">
          <button onclick="decreaseQty(${index})">➖</button>
          <span><strong>Qty:</strong> ${item.quantity}</span>
          <button onclick="increaseQty(${index})">➕</button>
        </div>
        <p><strong>Total:</strong> ₹${itemTotal}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;

    cartContainer.appendChild(div);
  });

  // Grand Total
  const totalDiv = document.createElement('div');
  totalDiv.style.textAlign = 'right';
  totalDiv.style.fontSize = '20px';
  totalDiv.style.marginTop = '20px';
  totalDiv.innerHTML = `<strong>Grand Total: ₹${grandTotal}</strong>`;
  cartContainer.appendChild(totalDiv);

  // Purchase Button
  const purchaseBtn = document.createElement('button');
  purchaseBtn.textContent = "Proceed to Purchase";
  purchaseBtn.style.marginTop = '20px';
  purchaseBtn.style.padding = '12px 24px';
  purchaseBtn.style.fontSize = '16px';
  purchaseBtn.style.backgroundColor = 'lightgreen';
  purchaseBtn.style.border = 'none';
  purchaseBtn.style.borderRadius = '8px';
  purchaseBtn.style.cursor = 'pointer';
  purchaseBtn.onclick = () => {
    window.location.href = "payment.html"; // Redirect to payment page
  };

  cartContainer.appendChild(purchaseBtn);
}

// Increase quantity
function increaseQty(index) {
  const cart = getCart();
  cart[index].quantity += 1;
  saveCart(cart);
  renderCart();
}

// Decrease quantity
function decreaseQty(index) {
  const cart = getCart();
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveCart(cart);
  renderCart();
}

// Remove item
function removeFromCart(index) {
  const cartItems = getCart();
  cartItems.splice(index, 1);
  saveCart(cartItems);
  renderCart();

  if (window.updateCartCounter) updateCartCounter();
}

// Make functions globally accessible
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.removeFromCart = removeFromCart;

//  Auth check before rendering
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("You must be logged in to view your cart.");
    window.location.href = "login.html";
  } else {
    renderCart();
  }
});
