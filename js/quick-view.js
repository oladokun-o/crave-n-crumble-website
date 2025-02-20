document.addEventListener("DOMContentLoaded", () => {
  const quickViewLinks = document.querySelectorAll(".quick-view");
  let cart = JSON.parse(localStorage.getItem('cart')) || []; // Read cart from localStorage

  // Function to update cart UI dynamically (optional)
  function updateCartUI() {
    const cartCount = document.getElementById("cart-count"); // Cart item count in header or sidebar
    if (cartCount) {
      cartCount.textContent = cart.length; // Update the cart count UI immediately
    }
  }

  // Add click event listener to each quick view link
  quickViewLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault(); // Prevent default action

      // Get product details from data attributes
      const productId = link.getAttribute("data-id");
      const productName = link.getAttribute("data-name");
      const productPrice = link.getAttribute("data-price");
      const productImage = link.getAttribute("data-image");

      // Update modal content dynamically
      const modalTitle = document.querySelector(".product_title");
      const modalPrice = document.querySelector(".new-price");
      const modalImage = document.querySelector(".quickview-slider .swiper-slide img");

      modalTitle.textContent = productName;
      modalPrice.textContent = `$${productPrice}`;
      modalImage.src = productImage;
      modalImage.alt = productName;

      // Add event listener to the "Add to Cart" button
      const addToCartButton = document.querySelector(".addtocartqv");

      // Ensure the event listener is only added once
      addToCartButton.removeEventListener("click", addToCart); // Remove any existing listener before adding a new one
      addToCartButton.addEventListener("click", addToCart);

      // Function to handle adding product to the cart
      function addToCart(e) {
        e.preventDefault();

        // Create product object for cart with quantity set to 1
        const product = {
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1 // Set the quantity to 1
        };

        // Add the product to the cart (ensure no duplicates)
        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex === -1) {
          cart.push(product);
          localStorage.setItem('cart', JSON.stringify(cart)); // Store cart in localStorage
        }

        // Full page reload to reflect updated cart
        window.location.reload(); // Reload the page to update the cart UI
      }
    });
  });

  // Initialize cart UI on page load (for persistent cart across pages)
  updateCartUI();
});
