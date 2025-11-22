function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  document.querySelectorAll('.item-card').forEach(card => {
    const bookBtn = card.querySelector('.book-button');
  
    bookBtn.addEventListener('click', () => {
        if (!currentUser) {
            alert("Please log in to add items to your cart.");
            window.location.href = "login.html";
            return;
          }
      const item = {
        title: card.querySelector('h2').textContent,
        desc: card.querySelector('p').textContent,
        image: 'menu images/450plate.jpg' // or dynamically get if you add <img>
      };
  
      const cart = getCart();
      const exists = cart.some(i => i.title === item.title);
  
      if (exists) {
        alert(`${item.title} is already in your cart.`);
        return;
      }
  
      cart.push(item);
      saveCart(cart);
      updateCartCounter();
      alert(`${item.title} package booked and added to cart!`);
    });
  });  