
// Toggle Sidebar
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('hidden');
}

// Toggle Cart Panel
function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('open');
    loadCart();
}

// Select size or color option
function selectOption(btn, type) {
    const container = btn.parentElement;
    container.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

// Show options when Add to Cart is clicked
function showOptions(button) {
    const card = button.closest('.card');
    card.querySelector('.size-options').style.display = 'block';
    card.querySelector('.color-options').style.display = 'block';
    button.textContent = 'Confirm Selection';
    button.onclick = function() {
        const size = card.querySelector('.size-options .selected')?.textContent;
        const color = card.querySelector('.color-options .selected')?.textContent;
        if (!size || !color) {
            alert('Please select size and color before adding to cart');
            return;
        }
        addToCart(button.dataset.name, button.dataset.price, size, color, card.querySelector('img').src);
    };
}

// Add item to cart with merge logic
function addToCart(name, price, size, color, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existing = cart.find(item => item.name === name && item.size === size && item.color === color);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, size, color, quantity: 1, image });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCart();
}

// Update cart count in icon
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElem = document.getElementById('cart-count');
    if (countElem) {
        countElem.textContent = total;
    }
}

// Load cart items into cart panel or cart page
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    cart.forEach((item, index) => {
        container.innerHTML += `
            <div style="display:flex;align-items:center;margin-bottom:10px;">
                <img src="${item.image}" style="width:50px;height:50px;border-radius:4px;margin-right:10px;">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.price} <br>
                    Size: ${item.size} | Color: ${item.color}<br>
                    Qty: ${item.quantity}
                </div>
                <button onclick="removeFromCart(${index})" style="margin-left:auto;background:red;color:white;border:none;padding:5px 8px;border-radius:4px;cursor:pointer;">X</button>
            </div>
        `;
    });
}

// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCart();
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
// Add click event to cart icon
 const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", toggleCartPanel);
    }
// === SLIDING CART PANEL ===
function toggleCartPanel() {
    const cartPanel = document.getElementById("cart-panel");
    cartPanel.classList.toggle("open");
}