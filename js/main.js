function login() {
      const loginBox = document.getElementsByClassName("login-box");
      const username = document.getElementById("usernameInput").value.trim();
      
      if (!username) {
        alert("username not found");
        return;
      }
      let greeting = "Hello World";

      if (username.toLowerCase() === "lucie") {
        greeting = "Hi Lucie!";
        document.querySelector('input[value="vegetarian"]').checked = true;
        document.querySelector('input[value="na"]').checked = true;
        document.querySelector('input[value="visions"]').checked = true;
        visiable();
        document.querySelector('input[value="expense"]').checked = true;
        applyFilters();
      } else if (username.toLowerCase() === "eric") {
        greeting = "Hi Eric!";
        document.querySelector('input[value="gluten"]').checked = true;
        document.querySelector('input[value="organic"]').checked = true;
        applyFilters();
      }

      loginBox[0].innerHTML = `<p>${greeting}</p>
        <button class="action" onclick="signOut()">Sign Out</button>`;
    }

    function signOut() {
      allProduct();
      document.querySelector('input[value="vegetarian"]').checked = false;
        document.querySelector('input[value="na"]').checked = false;
        document.querySelector('input[value="visions"]').checked = false;
        document.querySelector('input[value="gluten"]').checked = false;
        document.querySelector('input[value="organic"]').checked = false;
        visiable();
      const loginBox = document.getElementsByClassName("login-box");
      loginBox[0].innerHTML = `<input type="text" id="usernameInput" placeholder="Enter your user name">
          <button class="action" onclick="login()">Login</button>`;
    }

    function visiable(){
      const toggle = document.getElementById("visionToggle");
      document.body.classList.toggle("large-text", toggle.checked);
    }

    const form = document.getElementById("preferences-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      applyFilters();
    });
    
    // Initialize products on page load
    // Wait for all scripts to load before initializing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        // Small delay to ensure all scripts are loaded
        setTimeout(function() {
          allProduct();
        }, 100);
      });
    } else {
      // DOM already loaded
      setTimeout(function() {
        allProduct();
      }, 100);
    }

    // Enhanced filtering system using centralized product data
    function applyFilters() {
      const checkedDiets = Array.from(
        document.querySelectorAll('input[name="diet"]:checked')
      ).map(input => input.value);
      const organicChoice = document.querySelector('input[name="organic"]:checked')?.value || 'na';
      
      const filteredProducts = filterProducts(checkedDiets, organicChoice);
      renderProducts(filteredProducts);
    }
    
    function organic(){
      applyFilters();
    }
    function nonorganic(){
      applyFilters();
    }
    function vegetarian(){
      applyFilters();
    }
    function vegan(){
      applyFilters();
    }
    function lactose(){
      applyFilters();
    }
    function glutton(){
      applyFilters();
    }
    function diabetic(){
      applyFilters();
    }
    function expensive(){
      applyFilters();
    }
    function allProduct(){
      // Show all products sorted by price
      const allProducts = getProductsSortedByPrice();
      renderProducts(allProducts);
    }
    
    // Dynamic product rendering function
    function renderProducts(products) {
      const productsContainer = document.querySelector('.products');
      if (!productsContainer) return;
      
      productsContainer.innerHTML = '';
      
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.setAttribute('data-product-id', product.id);
        
        // Get current quantity from cart if item is already added
        // Note: cartIndex and cartAmount are defined in product2cart.js
        let quantity = 0;
        if (typeof window.cartIndex !== 'undefined' && window.cartIndex) {
          const cartItemIndex = window.cartIndex.indexOf(product.id);
          if (cartItemIndex !== -1 && typeof window.cartAmount !== 'undefined' && window.cartAmount) {
            quantity = window.cartAmount[cartItemIndex];
          }
        }
        
        let buttonHTML;
        if (quantity === 0) {
          buttonHTML = `<button class="action" onclick="addToCart(${product.id})">Add to Cart</button>`;
        } else {
          buttonHTML = `<button class="action" onclick="subToAmount(${product.id})">-</button>
            <p class="amount">${quantity}</p>
            <button class="action" onclick="addToAmount(${product.id})">+</button>`;
        }
        
        productDiv.innerHTML = `
          <div><img src="${product.image}" alt="${product.name}"></div>
          <h3>${product.name}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <div class="buttons">${buttonHTML}</div>
        `;
        
        productsContainer.appendChild(productDiv);
      });
    }