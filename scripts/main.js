
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp


function showSection(sectionId) {
    const sections = document.getElementsByClassName("section");

    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove("active");
    }

    document.getElementById(sectionId).classList.add("active");
}



// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems() {

    const ele = document.getElementsByName("product");
    const cart = document.getElementById("displayCart");
    cart.innerHTML = "";

    let chosenProducts = [];

    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            chosenProducts.push(ele[i].value);

            const item = document.createElement("div");
            item.className = "cart-item";

            item.innerHTML = `
                <span class="cart-name">${ele[i].value}</span>
                <span class="cart-price">$${getPrice(ele[i].value).toFixed(2)}</span>
            `;

            cart.appendChild(item);
        }
    }

    // Total price
    const totalDiv = document.createElement("div");
    totalDiv.className = "cart-total";

    totalDiv.innerHTML = `
        <span>Total</span>
        <span>$${getTotalPrice(chosenProducts).toFixed(2)}</span>
    `;

    cart.appendChild(totalDiv);
}




function populateShop() {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    // ---- Category dropdown ----
    const selectedCategory = document.getElementById("categorySelect")?.value || "None";

    // ---- Diet checkboxes ----
    const dietCheckboxes = document.getElementsByName("diet");
    let restrictions = {
        vegetarian: false,
        glutenFree: false,
        organic: false
    };

    for (let i = 0; i < dietCheckboxes.length; i++) {
        if (dietCheckboxes[i].checked) {
            if (dietCheckboxes[i].value === "Vegetarian") restrictions.vegetarian = true;
            if (dietCheckboxes[i].value === "GlutenFree") restrictions.glutenFree = true;
            if (dietCheckboxes[i].value === "Organic") restrictions.organic = true;
        }
    }

    // ---- Price range ----
    const minPrice = parseFloat(document.getElementById("minPrice").value);
    const maxPrice = parseFloat(document.getElementById("maxPrice").value);
    if (minPrice > maxPrice) return;

    // ---- Sort option ----
    const sortOption = document.getElementById("sortSelect").value;

    // ---- Filter products ----
    let filteredProducts = products.filter(product => {

        // Category dropdown filter
        if (selectedCategory === "Vegetarian" && !product.vegetarian) return false;
        if (selectedCategory === "GlutenFree" && !product.glutenFree) return false;
        if (selectedCategory === "Organic" && !product.organic) return false;

        // Checkbox filters
        if (restrictions.vegetarian && !product.vegetarian) return false;
        if (restrictions.glutenFree && !product.glutenFree) return false;
        if (restrictions.organic && !product.organic) return false;

        // Price filter
        if (product.price < minPrice || product.price > maxPrice) return false;

        return true;
    });

    // ---- Sort products ----
    if (sortOption === "highLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    // ---- Render cards ----
    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-title">${product.name}</div>
            <div class="price">$${product.price.toFixed(2)}</div>
            <label>
                <input type="checkbox" name="product" onclick="selectedItems()" value="${product.name}">
                Add
            </label>
        `;

        container.appendChild(card);
    });
}

function updatePriceRange() {
    const minSlider = document.getElementById("minPrice");
    const maxSlider = document.getElementById("maxPrice");
    const range = document.querySelector(".price-slider");
    const rangeText = document.getElementById("priceRangeText");

    let minVal = parseInt(minSlider.value);
    let maxVal = parseInt(maxSlider.value);

    // Prevent sliders from crossing
    if (minVal >= maxVal) {
        minSlider.value = maxVal - 1;
        minVal = maxVal - 1;
    }

    // Update the colored bar between dots
    const maxRange = parseInt(minSlider.max);
    range.style.left = (minVal / maxRange) * 100 + "%";
    range.style.right = 100 - (maxVal / maxRange) * 100 + "%";

    // Update displayed price text (optional but recommended)
    if (rangeText) {
        rangeText.textContent = `$${minVal} - $${maxVal}`;
    }
}
updatePriceRange();
  
window.onload = function () {
    showSection("Shop");
	populateShop();
};
