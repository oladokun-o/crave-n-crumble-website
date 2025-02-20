document.addEventListener("DOMContentLoaded", function () {
    const wishlistButtons = document.querySelectorAll(".wishlist-product");
  
    wishlistButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
  
        // Get product data from the button attributes
        const product = {
          id: this.dataset.id,
          name: this.dataset.name,
          price: this.dataset.price,
          image: this.dataset.image,
        };
        console.log(product);
  
        // Retrieve current wishlist from localStorage or create a new one
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  
        // Check if the product is already in the wishlist
        const exists = wishlist.find((item) => item.id === product.id);
        if (!exists) {
          wishlist.push(product); // Add new product to wishlist
          localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Save updated wishlist
          alert("Product added to wishlist!");
          location.reload();
        } else {
          alert("Product is already in the wishlist.");
        }
      });
    });
  });
  