// Function to clear the cart
function clearCart() {
  cart = []; // Empty the cart array
  saveCart(); // Save the empty cart to localStorage
  updateCartDisplay(); // Update the cart display
  alert("The cart has been cleared.");
}

// Select all "Clear Cart" buttons
const clearCartButtons = document.querySelectorAll("#clear-cart");

// Add event listeners to each "Clear Cart" button
clearCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default action
    if (confirm("Are you sure you want to clear the cart?")) {
      clearCart();
    }
  });
});

// Initialize the cart by loading from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to save the cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to load cart from localStorage
function loadCartFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to add an item to the cart
function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  saveCart(); // Save the updated cart
  updateCartDisplay();
}

// Function to update the cart display in multiple places
function updateCartDisplay() {
  const cartCount = document.querySelector(".cart-counters");
  const cartCounter = document.getElementById("bottom-counters");
  const mobileCartCount = document.getElementById("mobile-cart-counter");
  const bigCounter = document.querySelector(".big-counter");
  const subtotalPriceElement = document.querySelector(".subtotal-price");

  let subtotal = 0;

  // Loop through all elements with the class '.cart-items'
  document.querySelectorAll(".cart-item").forEach((cartItemsContainer) => {
    cartItemsContainer.innerHTML = ''; // Clear current items

    cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-product", "item-info");

      cartItem.innerHTML = `
        <div class="item-img cart-img">
          <a href="javascript:void(0)" class="img-area">
            <img src="${item.image}" class="img-fluid" alt="${item.name}" />
          </a>
        </div>
        <div class="cart-content item-title">
        <div class="info">
          <h6>${item.name}</h6>
         
          <div class="product-info">
            <div class="info-item">
              <span class="product-qty">${item.quantity}</span>
              <span>×</span>
              <span class="product-price">$${parseFloat(item.price).toFixed(2)}</span>
            </div>
          </div>
          </div>
          <div class="product-quantity-action">
            <div class="product-quantity">
              <div class="cart-plus-minus">
                <button class="dec qtybutton minus" data-id="${item.id}">
                  <i class="feather-minus"></i>
                </button>
                <input type="text" name="quantity" value="${item.quantity}" disabled />
                <button class="inc qtybutton plus" data-id="${item.id}">
                  <i class="feather-plus"></i>
                </button>
              </div>
            </div>
            <div class="delete-cart item-remove">
              <a href="javascript:void(0)" class="delete-icon text-danger remove-item" data-id="${item.id}">
                <i class="feather-trash-2"></i>
              </a>
            </div>
          </div>
        </div>
      `;

      cartItemsContainer.appendChild(cartItem);
      subtotal += parseFloat(item.price) * item.quantity;
    });
  });

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (bigCounter) bigCounter.textContent = totalItems;
  if (cartCounter) cartCounter.textContent = totalItems;
  if (cartCount) cartCount.textContent = totalItems;
  if (mobileCartCount) mobileCartCount.textContent = totalItems;

  if (subtotalPriceElement) {
    subtotalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Event listeners for quantity adjustment and item removal
  document.querySelectorAll(".minus").forEach((button) => {
    button.addEventListener("click", function () {
      adjustQuantity(this.getAttribute("data-id"), -1);
    });
  });

  document.querySelectorAll(".plus").forEach((button) => {
    button.addEventListener("click", function () {
      adjustQuantity(this.getAttribute("data-id"), 1);
    });
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      removeFromCart(this.getAttribute("data-id"));
    });
  });
}

// Function to adjust item quantity
function adjustQuantity(productId, change) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartDisplay();
    }
  }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartDisplay();
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const product = {
      id: this.getAttribute("data-id"),
      name: this.getAttribute("data-name"),
      price: this.getAttribute("data-price"),
      image: this.getAttribute("data-image"),
    };

    addToCart(product);
  });
});

// Load cart from localStorage on page load
window.addEventListener("load", () => {
  loadCartFromLocalStorage();
  updateCartDisplay();
});
