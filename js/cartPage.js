// Function to load cart from local storage
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  cart = storedCart ? JSON.parse(storedCart) : [];
}

// Function to save cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update the cart display
function updateCartDisplay() {
    console.log("Updating cart display...");
  console.log("Cart contents:", cart);
  const cartItemsContainer = document.querySelector(".cart-wrap-ul");
  const subtotalPriceElement = document.querySelector(".subtotal-price");

  cartItemsContainer.innerHTML = ""; // Clear previous cart items

  let subtotal = 0;

  cart.forEach((item) => {
    // Ensure price and quantity are valid numbers
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10);

    if (isNaN(price) || isNaN(quantity)) {
      console.error(`Invalid price or quantity for item: ${item.name}`);
      return; // Skip this item if invalid
    }
    const itemTotalPrice = price * quantity;
    subtotal += itemTotalPrice;

    // Create a list item for the cart
    const cartItem = document.createElement("li");
    cartItem.classList.add("item-info");

    // Generate the cart item structure
    cartItem.innerHTML = `
      <!-- cart-img start -->
      <div class="item-img">
        <a href="product-template.html">
          <img src="${item.image}" class="img-fluid" alt="${item.name}" />
        </a>
      </div>
      <!-- cart-img end -->

      <!-- cart-title start -->
      <div class="item-title">
        <a href="product-template.html">${item.name}</a>
        <span class="item-option">
          <span class="pro-variant-title">Quantity:</span>
          <span class="pro-variant-type">${item.quantity}</span>
        </span>
        <span class="item-option">
          <span class="item-price">$${item.price}</span>
        </span>
      </div>
      <!-- cart-title end -->
    `;

    cartItemsContainer.appendChild(cartItem);

    // Quantity and remove actions
    const qtyAndRemove = document.createElement("li");
    qtyAndRemove.classList.add("item-qty");
    qtyAndRemove.innerHTML = `
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
      </div>
      <div class="item-remove">
        <span class="remove-wrap">
          <a href="javascript:void(0)" class="text-danger remove-item" data-id="${item.id}">Remove</a>
        </span>
      </div>
    `;
    cartItemsContainer.appendChild(qtyAndRemove);

    // Add price details
    const priceDetails = document.createElement("li");
    priceDetails.classList.add("item-price");
    priceDetails.innerHTML = `<span class="amount full-price">$${itemTotalPrice.toFixed(2)}</span>`;
    cartItemsContainer.appendChild(priceDetails);
  });

  // Update subtotal
  if (subtotalPriceElement) {
    subtotalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Add event listeners for quantity adjustment and removal
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

// Adjust quantity function
function adjustQuantity(id, change) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id); // Remove item if quantity is zero or less
    } else {
      saveCartToLocalStorage();
      updateCartDisplay();
    }
  }
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCartToLocalStorage();
  updateCartDisplay();
}

// Add item to cart
function addToCart(newItem) {
  const existingItem = cart.find((item) => item.id === newItem.id);
  if (existingItem) {
    existingItem.quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }
  saveCartToLocalStorage();
  updateCartDisplay();
}

// Load cart from local storage on page load
window.addEventListener("load", () => {
  loadCartFromLocalStorage();
  updateCartDisplay();
});
