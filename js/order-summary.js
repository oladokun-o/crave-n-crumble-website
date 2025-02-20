// Fetch countries from REST API for checkout page
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((countries) => {
    // Sort countries alphabetically by name
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    const countrySelect = document.getElementById("country-select");

    // Populate country dropdown
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name.common; // Use country name as value
      option.textContent = country.name.common; // Display country name
      countrySelect.appendChild(option);
    });

    // Update order summary on country selection
    countrySelect.addEventListener("change", updateOrderSummary);
  })
  .catch((error) => console.error("Error fetching countries:", error));

// Function to get cart items from local storage
function getCartItems() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Function to update order summary during checkout
function updateOrderSummary() {
  const cartItems = getCartItems();
  const orderSummaryList = document.getElementById("order-summary-list");
  const countrySelect = document.getElementById("country-select");
  const selectedCountry = countrySelect.value;

  // Clear the order summary
  orderSummaryList.innerHTML = "";

  if (cartItems.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "Your cart is empty.";
    orderSummaryList.appendChild(emptyLi);
    return;
  }

  // Calculate subtotal
  let subtotal = 0;

  // Populate cart items
  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity; // Calculate total for each item

    const li = document.createElement("li");
    li.innerHTML = `
      <span class="p-name">${item.name} (x${item.quantity}):</span>
      <span class="p-price">$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    orderSummaryList.appendChild(li);
  });

  // Add subtotal
  const subtotalLi = document.createElement("li");
  subtotalLi.innerHTML = `
    <span class="p-name">Subtotal:</span>
    <span class="p-price">$${subtotal.toFixed(2)}</span>
  `;
  orderSummaryList.appendChild(subtotalLi);

  // Fetch shipping cost (placeholder logic, replace with actual API or logic)
  const shippingCost = selectedCountry ? 10.0 : 0; // Set a default shipping cost
  const shippingLi = document.createElement("li");
  shippingLi.innerHTML = `
    <span class="p-name">Shipping to ${selectedCountry || "N/A"}:</span>
    <span class="p-price">$${shippingCost.toFixed(2)}</span>
  `;
  orderSummaryList.appendChild(shippingLi);

  // Calculate and display total
  const total = subtotal + shippingCost;
  const totalLi = document.createElement("li");
  totalLi.classList.add("order-total");
  totalLi.innerHTML = `
    <span class="p-name">Order Total:</span>
    <span class="p-price">$${total.toFixed(2)}</span>
  `;
  orderSummaryList.appendChild(totalLi);

  // Save order details to localStorage (when completing the checkout)
  const orderNumber = Date.now();  // Generate unique order number
  const orderDetails = {
    orderNumber: orderNumber,
    totalPrice: total.toFixed(2),
    orderDate: new Date().toLocaleString(),
  };

  localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
}

// Function to update order completion page
function updateOrderComplete() {
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

  if (orderDetails) {
    const orderNoElement = document.getElementById("order-no");
    const orderDateElement = document.getElementById("order-date");
    const totalPriceElement = document.getElementById("total-price");

    orderNoElement.textContent = orderDetails.orderNumber;
    orderDateElement.textContent = orderDetails.orderDate;
    totalPriceElement.textContent = `$${orderDetails.totalPrice}`;
  } else {
    alert("No order details found in localStorage!");
  }
}

// Initialize the order summary on page load for checkout page
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("order-summary-list")) {
    updateOrderSummary(); // For checkout page
  } else if (document.getElementById("order-no")) {
    updateOrderComplete(); // For order-complete page
  }
});
