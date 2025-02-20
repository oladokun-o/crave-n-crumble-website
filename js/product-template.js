  // Function to get URL parameters
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Fetch product data from the JSON file
  fetch("json/product-data.json")
    .then((response) => response.json())
    .then((products) => {
      const productId = getQueryParam("productId");
      const product = products.find((p) => p.id === productId);

      if (product) {
        // Update the HTML with product details
        document.querySelector(".breadcrumb-title h2").innerText = product.name;
        
        document.querySelector(".breadcrumb-item-link span").innerText = product.name;
        document.querySelector(".product-title h2").innerText = product.name;
        document.querySelector(".true-price").innerText = product.price;
        document.querySelector(".product-imag").src = product.image;
        document.querySelector(".product-single.img-link").href = product.image;
      } else {
        console.error("Product not found");
      }
    })
    .catch((error) => console.error("Error fetching product data:", error));

