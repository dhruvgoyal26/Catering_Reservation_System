import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { db, auth } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Get plate info from URL
const params = new URLSearchParams(window.location.search);
const plates = parseInt(params.get('plates')) || 0;
const advance = plates * 200;

// Fill hidden fields
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById('plates').value = plates;
  document.getElementById('advance').value = advance;
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please log in to continue.");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById('bookingForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const mobile = form.mobile.value;
    const address = form.address.value;
    const occasion = form.occasion.value;
    const date = form.date.value;

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        name,
        mobile,
        address,
        occasion,
        date,
        plates,
        advance,
        createdAt: serverTimestamp()
      });

      alert("Booking request submitted successfully!");
      localStorage.removeItem("cart");
      window.location.href = "thankyou.html";
    } catch (err) {
      console.error("🔥 Booking error:", err);
      alert("Failed to submit booking.");
    }
  });
});
