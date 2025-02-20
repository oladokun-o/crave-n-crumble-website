// Initialize product data
let productData = [];

// Load JSON data
fetch('json/product-data.json')
  .then((response) => response.json())
  .then((data) => {
    productData = data;
  })
  .catch((error) => console.error('Error loading JSON:', error));

// DOM Elements for First Search
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchButton = document.getElementById('searchButton');

// DOM Elements for Second Search
const secondarySearchInput = document.querySelector('.side-wrap .input-text');
const secondarySearchButton = document.querySelector('.side-wrap .search-btn');

// Add Results Container for Second Search
let secondarySearchResults = document.querySelector('.side-wrap .search-results');
if (!secondarySearchResults) {
  secondarySearchResults = document.createElement('div');
  secondarySearchResults.classList.add('search-results');
  document.querySelector('.side-wrap .crap-search').appendChild(secondarySearchResults);
}
console.log('Secondary Results Container:', secondarySearchResults);
// Reusable Function to Perform Search
function performSearch(query, resultsContainer) {
  resultsContainer.innerHTML = ''; // Clear previous results

  if (query.trim() === '') {
    resultsContainer.style.display = 'none';
    return;
  }

  // Filter products based on the query
  const matches = productData.filter((product) =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );


  if (matches.length > 0) {
    resultsContainer.style.display = 'block';
    matches.forEach((product) => {
      const resultItem = document.createElement('div');
      resultItem.classList.add('result-item');
      resultItem.innerHTML = `
      <a href="product-template.html?productId=${product.id}">
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <img src="${product.image}" style="width: 70px; height: 70px; margin-right: 10px;" alt="${product.name}">
          <div>
            <h4 style="margin: 0;">${product.name}</h4>
            <p style="margin: 0;">${product.description}</p>
            <p style="margin: 0;"><strong>Price:</strong> ${product.price}</p>
          </div>
        </div>
        </a>
      `;
      resultsContainer.appendChild(resultItem);
    });
  } else {
    resultsContainer.style.display = 'block';
    resultsContainer.innerHTML = '<p>No results found</p>';
  }
}

// Event Listeners for First Search
searchButton.addEventListener('click', () => performSearch(searchInput.value.toLowerCase(), searchResults));
searchInput.addEventListener('input', () => performSearch(searchInput.value.toLowerCase(), searchResults));
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  performSearch(searchInput.value.toLowerCase(), searchResults);
});

// Event Listeners for Second Search
secondarySearchButton.addEventListener('click', () => performSearch(secondarySearchInput.value.toLowerCase(), secondarySearchResults));
secondarySearchInput.addEventListener('input', () => performSearch(secondarySearchInput.value.toLowerCase(), secondarySearchResults));