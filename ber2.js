// === CART FUNCTIONALITY ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in icon
function updateCartCount() {
    const count = cart.length;
    const cartIcon = document.getElementById("cart-count");
    if (cartIcon) {
        cartIcon.textContent = count;
    }
}

// Add item to cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

// Render cart items in panel
function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <strong>${item.name}</strong><br>
            Price: ${item.price}<br>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
    });
}

// === SLIDING CART PANEL ===
function toggleCartPanel() {
    const cartPanel = document.getElementById("cart-panel");
    cartPanel.classList.toggle("open");
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCartItems();

    // Add click event to "Add to Cart" buttons
    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-name");
            const productPrice = button.getAttribute("data-price");
            addToCart({ name: productName, price: productPrice });
        });
    });

    // Add click event to cart icon
    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", toggleCartPanel);
    }
});
