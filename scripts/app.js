// Cart Logic with localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart
function addToCart(productId, productName, price) {
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: price,
      quantity: 1
    });
  }
  
  updateCart();
  showNotification(`${productName} added to cart!`);
}

// Update Cart Everywhere
function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update Cart Counter
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = totalItems;
  });

  // Update Cart Page
  if (window.location.pathname.includes('cart.html')) {
    const cartItemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    let total = 0;
    
    cartItemsEl.innerHTML = '';
    cart.forEach(item => {
      total += item.price * item.quantity;
      cartItemsEl.innerHTML += `
        <div class="cart-item">
          <div>
            <h4>${item.name}</h4>
            <p>$${item.price} x ${item.quantity}</p>
          </div>
          <button onclick="removeItem('${item.id}')">Remove</button>
        </div>
      `;
    });
    
    totalEl.textContent = total.toFixed(2);
  }
}

// Remove Item
function removeItem(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Notification System
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Initialize Cart on Load
document.addEventListener('DOMContentLoaded', updateCart);