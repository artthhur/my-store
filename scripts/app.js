// Cart functionality using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, price) {
    cart.push({ id: productId, price: price });
    updateCart();
}

function updateCart() {
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart counter
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = cart.length;
    });

    // Update cart page
    if (window.location.pathname.includes('cart.html')) {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        let total = 0;
        
        cartItems.innerHTML = '';
        cart.forEach(item => {
            total += item.price;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <p>Product ${item.id}</p>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            `;
        });
        
        cartTotal.textContent = total.toFixed(2);
        document.getElementById('form-total').value = total.toFixed(2);
    }
}

// Initialize cart on page load
updateCart();