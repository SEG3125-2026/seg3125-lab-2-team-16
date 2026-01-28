const slider = document.getElementById("slider");
    const cartItem = [];
    const cartPrice = [];
    const cartAmount = [];
    const cartIndex = [];
    let currentSlide = 0;

    function goToSlide(index) {
      index = Math.max(0, Math.min(index, 2));
      currentSlide = index;
      slider.style.transform = `translateX(-${index * 33}%)`;

      const zoneIds = ['login', 'product', 'cart'];
      const zoneEl = document.getElementById(zoneIds[index]);
      if (zoneEl) zoneEl.focus({ preventScroll: true });
    }
    function addToCart(index) {
      let item;
      let price;
      switch (index) {
        case 0:
          item = "Carrots";
          price = 1.49;
          break;
        case 1:
          item = "Broccoli";
          price = 1.99;
          break;
        case 2:
          item = "Apples";
          price = 2.49;
          break;
        case 3:
          item = "Milk";
          price = 2.79;
          break;
        case 4:
          item = "Whole Weat Bread";
          price = 2.99;
          break;
        case 5:
          item = "White Rice";
          price = 3.99;
          break;
        case 6:
          item = "Gluten-Free Bread";
          price = 4.99;
          break;
        case 7:
          item = "Organic Eggs";
          price = 5.49;
          break;
        case 8:
          item = "Chicken Breast";
          price = 6.99;
          break;
        case  9:
          item = "Salmon Fillet";
          price = 8.99;
      }
      cartItem.push(item);
      cartPrice.push(price);
      cartAmount.push(1);
      cartIndex.push(index);
      const button = document.getElementsByClassName("buttons");
      button[index].innerHTML=`<button class="action" onclick="subToAmount(${index})">-</button>
      <p class="amount">1</p>
      <button class="action" onclick="addToAmount(${index})">+</button>`;
      renderCart();
    }
    function addToAmount(index){
      let tempIndex = cartIndex.indexOf(index);
      cartAmount[tempIndex]=cartAmount[tempIndex]+1;
      const product = document.getElementsByClassName("buttons");
      product[index].innerHTML=`<button class="action" onclick="subToAmount(${index})">-</button>
      <p class="amount">${cartAmount[tempIndex]}</p>
      <button class="action" onclick="addToAmount(${index})">+</button>`;
      renderCart()
    }
    function subToAmount(index){
      const product = document.getElementsByClassName("buttons");
      let tempIndex = cartIndex.indexOf(index);
      if (cartAmount[tempIndex] <= 1){
        product[index].innerHTML=`<button class="action" onclick="addToCart(${index})">Add to Cart</button>`;
        removeItem(tempIndex);
        return;
      }
      cartAmount[tempIndex]=cartAmount[tempIndex]-1;
      product[index].innerHTML=`<button class="action" onclick="subToAmount(${index})">-</button>
      <p class="amount">${cartAmount[tempIndex]}</p>
      <button class="action" onclick="addToAmount(${index})">+</button>`;
      renderCart()
    }
    function renderCart() {
      const list = document.getElementById("cartList");
      list.innerHTML = '';
      if (cartItem.length === 0) {
        list.innerHTML = '<li class="empty">Your cart is empty</li>';
        return;
      }
      sortCart()
      let total = 0;
      cartItem.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<h3>${item}</h3> <p>${cartPrice[index]}$</p> <button class="action" onclick="subToAmount(${cartIndex[index]})">-</button>
      <p class="amount">${cartAmount[index]}</p>
      <button class="action" onclick="addToAmount(${cartIndex[index]})">+</button>`;
        list.appendChild(li);
        total = total + (cartAmount[index]*cartPrice[index]);
      });
      const li = document.createElement("li");
        li.innerHTML = `<h3>Total: </h3> <p>${Math.round(total*100)/100}$</p>`;
        list.appendChild(li);
    }

    function sortCart(){
      const n = cartIndex.length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (cartIndex[j] > cartIndex[j + 1]) {
            let temp0 = cartIndex[j];
            cartIndex[j] = cartIndex[j + 1];
            cartIndex[j + 1] = temp0;

            let temp1 = cartAmount[j];
            cartAmount[j] = cartAmount[j + 1];
            cartAmount[j + 1] = temp1;

            let temp2 = cartItem[j];
            cartItem[j] = cartItem[j + 1];
            cartItem[j + 1] = temp2;

            let temp3 = cartPrice[j];
            cartPrice[j] = cartPrice[j + 1];
            cartPrice[j + 1] = temp3;
          }
        }
      }
    }

    function removeItem(index) {
      cartItem.splice(index, 1);
      cartAmount.splice(index, 1);
      cartPrice.splice(index, 1);
      cartIndex.splice(index, 1);
      renderCart();
    }
