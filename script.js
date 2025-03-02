// DOMContentLoaded ensures the script runs after the HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Filter products by category
    function filterProducts() {
        const categoryFilter = document.getElementById("category").value;
        const productCards = document.querySelectorAll(".product-card");

        productCards.forEach(card => {
            const category = card.dataset.category; // Assuming each product card has a data-category attribute
            if (categoryFilter === "all" || category === categoryFilter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Attach the filterProducts function to the category dropdown
    const categoryDropdown = document.getElementById("category");
    if (categoryDropdown) {
        categoryDropdown.addEventListener("change", filterProducts);
    }

    // Add item to cart (example functionality)
    function addToCart(productId) {
        alert(`Product ID ${productId} added to cart!`);
        // You can replace this with an AJAX call to send data to the backend
    }

    // Example: Sorting products by price
    function sortProductsByPrice(order) {
        const productList = document.querySelector(".product-list");
        const productCards = Array.from(productList.children);

        productCards.sort((a, b) => {
            const priceA = parseFloat(a.querySelector("p:nth-child(3)").textContent.replace("$", ""));
            const priceB = parseFloat(b.querySelector("p:nth-child(3)").textContent.replace("$", ""));

            return order === "asc" ? priceA - priceB : priceB - priceA;
        });

        // Re-append sorted cards to the product list
        productCards.forEach(card => productList.appendChild(card));
    }

    // Attach sorting functionality to buttons (if they exist)
    const sortAscButton = document.getElementById("sort-asc");
    const sortDescButton = document.getElementById("sort-desc");

    if (sortAscButton) {
        sortAscButton.addEventListener("click", () => sortProductsByPrice("asc"));
    }

    if (sortDescButton) {
        sortDescButton.addEventListener("click", () => sortProductsByPrice("desc"));
    }

    // Example: Search functionality for products
    function searchProducts() {
        const query = document.getElementById("search-input").value.toLowerCase();
        const productCards = document.querySelectorAll(".product-card");

        productCards.forEach(card => {
            const productName = card.querySelector("h3").textContent.toLowerCase();
            if (productName.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Attach search functionality to the search input
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", searchProducts);
    }
});
function filterProducts() {
    const categoryFilter = document.getElementById("category").value;
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {
        const category = card.dataset.category;
        if (categoryFilter === "all" || category === categoryFilter) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

document.getElementById("category").addEventListener("change", filterProducts);