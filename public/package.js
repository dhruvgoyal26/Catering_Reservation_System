document.addEventListener('DOMContentLoaded', () => {
    const bookBtn = document.getElementById('bookPackageBtn');
    if (!bookBtn) return;
  
    const packageItem = {
      title: "₹650 Plate Package",
      desc: "Perfect for small events and functions. Delicious and fulfilling!",
      image: "menu images/450plate.jpg"
    };
  
    bookBtn.addEventListener('click', () => {
        if (!currentUser) {
            alert("Please log in to add items to your cart.");
            window.location.href = "login.html";
            return;
          }
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const exists = cart.some(item => item.title === packageItem.title);
  
      if (exists) {
        alert("This package is already in your cart.");
      } else {
        cart.push(packageItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        alert("Package booked and added to cart!");
      }
    });
  });
  