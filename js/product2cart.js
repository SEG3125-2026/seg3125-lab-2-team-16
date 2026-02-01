// Enhanced cart functionality using centralized product data

const slider = document.getElementById("slider");
    // Cart arrays - made globally accessible for product rendering
    const cartItem = [];
    const cartPrice = [];
    const cartAmount = [];
    const cartIndex = [];
    
    // Make cart arrays globally accessible
    window.cartItem = cartItem;
    window.cartPrice = cartPrice;
    window.cartAmount = cartAmount;
    window.cartIndex = cartIndex;
    
    let currentSlide = 0;

    function goToSlide(index) {
      index = Math.max(0, Math.min(index, 2));
      currentSlide = index;
      slider.style.transform = `translateX(-${index * 33}%)`;

      const zoneIds = ['login', 'product', 'cart'];
      const zoneEl = document.getElementById(zoneIds[index]);
      if (zoneEl) zoneEl.focus({ preventScroll: true });
    }
    
    function addToCart(productId) {
      const product = getProductById(productId);
      if (!product) return;
      
      // Check if product is already in cart
      const existingIndex = cartIndex.indexOf(productId);
      if (existingIndex !== -1) {
        // If already in cart, just increase quantity
        addToAmount(productId);
        return;
      }
      
      cartItem.push(product.name);
      cartPrice.push(product.price);
      cartAmount.push(1);
      cartIndex.push(productId);
      
      // Update the button for this product
      updateProductButton(productId, 1);
      renderCart();
    }
    function addToAmount(productId){
      let tempIndex = cartIndex.indexOf(productId);
      if (tempIndex === -1) return;
      
      cartAmount[tempIndex] = cartAmount[tempIndex] + 1;
      updateProductButton(productId, cartAmount[tempIndex]);
      renderCart();
    }
    
    function subToAmount(productId){
      let tempIndex = cartIndex.indexOf(productId);
      if (tempIndex === -1) return;
      
      if (cartAmount[tempIndex] <= 1){
        updateProductButton(productId, 0);
        removeItem(tempIndex);
        return;
      }
      cartAmount[tempIndex] = cartAmount[tempIndex] - 1;
      updateProductButton(productId, cartAmount[tempIndex]);
      renderCart();
    }
    
    // Helper function to update product button based on cart state
    function updateProductButton(productId, quantity) {
      const productElement = document.querySelector(`[data-product-id="${productId}"]`);
      if (!productElement) return;
      
      const buttonContainer = productElement.querySelector('.buttons');
      if (!buttonContainer) return;
      
      if (quantity === 0) {
        buttonContainer.innerHTML = `<button class="action" onclick="addToCart(${productId})">Add to Cart</button>`;
      } else {
        buttonContainer.innerHTML = `<button class="action" onclick="subToAmount(${productId})">-</button>
          <p class="amount">${quantity}</p>
          <button class="action" onclick="addToAmount(${productId})">+</button>`;
      }
    }
    
    // Function to refresh all product buttons based on current cart state
    function refreshProductButtons() {
      if (typeof renderProducts === 'function') {
        // Get current filters and re-render products to update buttons
        const checkedDiets = Array.from(
          document.querySelectorAll('input[name="diet"]:checked')
        ).map(input => input.value);
        const organicChoice = document.querySelector('input[name="organic"]:checked')?.value || 'na';
        
        const filteredProducts = filterProducts(checkedDiets, organicChoice);
        renderProducts(filteredProducts);
      }
    }
    function renderCart() {
      const list = document.getElementById("cartList");
      list.innerHTML = '';
      if (cartItem.length === 0) {
        list.innerHTML = '<li class="empty">Your cart is empty</li>';
        return;
      }
      
      // Sort cart by price (ascending)
      sortCartByPrice();
      
      let total = 0;
      cartItem.forEach((item, index) => {
        const li = document.createElement("li");
        const itemTotal = (cartAmount[index] * cartPrice[index]).toFixed(2);
        li.innerHTML = `<h3>${item}</h3> 
          <p>$${cartPrice[index].toFixed(2)} × ${cartAmount[index]} = $${itemTotal}</p> 
          <div class="cart-buttons">
            <button class="action" onclick="subToAmount(${cartIndex[index]})">-</button>
            <p class="amount">${cartAmount[index]}</p>
            <button class="action" onclick="addToAmount(${cartIndex[index]})">+</button>
          </div>`;
        list.appendChild(li);
        total = total + (cartAmount[index] * cartPrice[index]);
      });
      
      const li = document.createElement("li");
      li.className = "cart-total";
      li.innerHTML = `<h3>Total: </h3> <p>$${total.toFixed(2)}</p>`;
      list.appendChild(li);
    }

    // Enhanced cart sorting by price
    function sortCartByPrice(){
      // Create array of indices to sort
      const indices = cartIndex.map((_, i) => i);
      
      // Sort indices based on price
      indices.sort((a, b) => cartPrice[a] - cartPrice[b]);
      
      // Reorder all arrays based on sorted indices
      const sortedItem = indices.map(i => cartItem[i]);
      const sortedPrice = indices.map(i => cartPrice[i]);
      const sortedAmount = indices.map(i => cartAmount[i]);
      const sortedIndex = indices.map(i => cartIndex[i]);
      
      // Update arrays
      cartItem.length = 0;
      cartPrice.length = 0;
      cartAmount.length = 0;
      cartIndex.length = 0;
      
      cartItem.push(...sortedItem);
      cartPrice.push(...sortedPrice);
      cartAmount.push(...sortedAmount);
      cartIndex.push(...sortedIndex);
    }

    function removeItem(index) {
      cartItem.splice(index, 1);
      cartAmount.splice(index, 1);
      cartPrice.splice(index, 1);
      cartIndex.splice(index, 1);
      renderCart();
    }
