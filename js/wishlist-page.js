document.addEventListener("DOMContentLoaded", function () {
  const wishlistCounterElements = document.querySelectorAll(".wishlist-counter");
  const wishlistContainer = document.querySelector(".wishlist-tile-container");
  const clearWishlistButton = document.querySelector(".clear-wishlist");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to update wishlist count
  function updateWishlistCount() {
    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const count = wishlist.length;

    wishlistCounterElements.forEach((counter) => {
      counter.textContent = count;
    });
  }

  // Function to render wishlist items (only for the wishlist page)
  function renderWishlist() {
    if (!wishlistContainer) return;

    if (wishlist.length === 0) {
      wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
    } else {
      wishlistContainer.innerHTML = "";
      wishlist.forEach((product) => {
        const listItem = document.createElement("ul");
        listItem.className = "wishlist-container";

        listItem.innerHTML = `
          <li class="wishlist-info">
            <div class="item-img">
              <a href="javascript:void(0)">
                <img src="${product.image}" class="img-fluid" alt="${product.name}" />
              </a>
            </div>
            <div class="item-title">
              <a href="javascript:void(0)">${product.name}</a>
            </div>
          </li>
          <li class="item-add-remove">
            <div class="item-add">
              <a href="javascript:void(0)" class="add-to-cart" data-id="${product.id}">
                <span>
                  <span class="cart-title">Add to cart</span>
                </span>
              </a>
            </div>
          </li>
          <li class="item-price">
            <div class="price-box">
              <span class="new-price">€${product.price}</span>
              <span class="old-price">€${(product.price * 1.2).toFixed(2)}</span>
            </div>
            <span class="item-remove">
              <a
                href="javascript:void(0)"
                class="action-wishlist wishlist-btn text-danger is-active"
                data-id="${product.id}"
              >
                <span class="remove-wishlist"><i class="fa fa-trash"></i></span>
              </a>
            </span>
          </li>
        `;
        wishlistContainer.appendChild(listItem);
      });
    }
  }

  // Function to add item to cart with default quantity
  function addToCart(productId) {
    const product = wishlist.find((item) => item.id === productId);

    if (product) {
      const existingCartItem = cart.find((item) => item.id === productId);

      if (existingCartItem) {
        // If the product is already in the cart, increment the quantity
        existingCartItem.quantity += 1;
      } else {
        // Add the product to the cart with a default quantity of 1
        cart.push({ ...product, quantity: 1 });
      }

      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
      location.reload();
    } else {
      alert("Product not found in wishlist.");
    }
  }

  // Function to clear wishlist
  function clearWishlist() {
    localStorage.removeItem("wishlist");
    wishlist = [];
    confirm("Are you sure you want to clear wishlists?");
    renderWishlist();
    updateWishlistCount();
  }

  // Attach clear wishlist functionality
  if (clearWishlistButton) {
    clearWishlistButton.addEventListener("click", function () {
      clearWishlist();
    });
  }

  // Handle removing items from wishlist
  if (wishlistContainer) {
    wishlistContainer.addEventListener("click", function (event) {
      const removeButton = event.target.closest(".remove-wishlist");
      if (removeButton) {
        const id = removeButton.closest(".action-wishlist").dataset.id;
        wishlist = wishlist.filter((item) => item.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Product removed from wishlist!");
        renderWishlist();
        updateWishlistCount();
      }

      const addToCartButton = event.target.closest(".add-to-cart");
      if (addToCartButton) {
        const id = addToCartButton.dataset.id;
        addToCart(id); // Call addToCart function
      }
    });
  }

  // Initial rendering and count update
  renderWishlist();
  updateWishlistCount();
});
