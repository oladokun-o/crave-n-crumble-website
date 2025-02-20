document.addEventListener("DOMContentLoaded", () => {
    // Get references to the small screen dropdown and large screen list
    const sortByDropdown = document.getElementById("SortBy");
    const sortList = document.getElementById("select-wrap");
    const productGrid = document.querySelector("#product-grid");
  
    if (!productGrid) {
      console.error("Product grid not found!");
      return;
    }
  
    // Function to sort products
    function sortProducts(criteria) {
      const products = Array.from(productGrid.children);
  
      const sortedProducts = products.sort((a, b) => {
        const priceA = parseFloat(
          a.querySelector(".new-price").textContent.replace(/[^0-9.]/g, "")
        );
        const priceB = parseFloat(
          b.querySelector(".new-price").textContent.replace(/[^0-9.]/g, "")
        );
  
        const titleA = a.querySelector("h6 a").textContent.trim().toLowerCase();
        const titleB = b.querySelector("h6 a").textContent.trim().toLowerCase();
  
        switch (criteria) {
          case "price-ascending":
            return priceA - priceB;
          case "price-descending":
            return priceB - priceA;
          case "title-ascending":
            return titleA.localeCompare(titleB);
          case "title-descending":
            return titleB.localeCompare(titleA);
          default:
            return 0; // No sorting for "Featured" or default
        }
      });
  
      // Update product grid with sorted products
      productGrid.innerHTML = "";
      sortedProducts.forEach((product) => productGrid.appendChild(product));
    }
  
    // Event listener for small screen dropdown
    if (sortByDropdown) {
      sortByDropdown.addEventListener("change", (event) => {
        const criteria = event.target.value;
        sortProducts(criteria);
      });
    }
  
    // Event listener for large screen clickable list
    if (sortList) {
      sortList.addEventListener("click", (event) => {
        const clickedElement = event.target.closest("a");
        if (!clickedElement) return;
  
        // Get the sorting criteria
        const criteriaMap = {
          "Featured": "manual",
          "Best Selling": "best-selling",
          "Alphabetically, A-Z": "title-ascending",
          "Alphabetically, Z-A": "title-descending",
          "Price, low to high": "price-ascending",
          "Price, high to low": "price-descending",
        };
  
        const criteria = criteriaMap[clickedElement.textContent.trim()];
        if (criteria) {
          // Update the displayed title for large screens
          const sortTitle = document.querySelector(".short-title .sort-title");
          if (sortTitle) {
            sortTitle.textContent = clickedElement.textContent.trim();
          }
  
          // Sort products
          sortProducts(criteria);
        }
      });
    }
  });
  