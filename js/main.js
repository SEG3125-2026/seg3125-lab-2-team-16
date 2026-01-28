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
        vegetarian();
        expensive();
      } else if (username.toLowerCase() === "eric") {
        greeting = "Hi Eric!";
        document.querySelector('input[value="gluten"]').checked = true;
        document.querySelector('input[value="organic"]').checked = true;
        glutton();
        organic();
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
      allProduct();
      e.preventDefault();
      const checkedDiets = Array.from(
        document.querySelectorAll('input[name="diet"]:checked')
      ).map(input => input.value);
      const organicChoice = document.querySelector('input[name="organic"]:checked')?.value;
      if (checkedDiets.includes("vegetarian")) vegetarian();
      if (checkedDiets.includes("vegan")) vegan();
      if (checkedDiets.includes("lactose")) lactose();
      if (checkedDiets.includes("gluten")) glutton();
      if (checkedDiets.includes("diabetes")) diabetic();
      if (checkedDiets.includes("expense")) expensive();
      if (organicChoice === "organic") organic();
      else if (organicChoice === "non-organic") nonorganic();
    });

    function organic(){
      const products = document.querySelectorAll('.product');
      products[0].style.display = 'none';
      products[3].style.display = 'none';
      products[4].style.display = 'none';
      products[5].style.display = 'none';
      products[6].style.display = 'none';
      products[8].style.display = 'none';
      products[9].style.display = 'none';
    }
    function nonorganic(){
      const products = document.querySelectorAll('.product');
      products[1].style.display = 'none';
      products[2].style.display = 'none';
      products[7].style.display = 'none';
    }
    function vegetarian(){
      const products = document.querySelectorAll('.product');
      products[8].style.display = 'none';
      products[9].style.display = 'none';
    }
    function vegan(){
      const products = document.querySelectorAll('.product');
      products[3].style.display = 'none';
      products[7].style.display = 'none';
      products[8].style.display = 'none';
      products[9].style.display = 'none';
    }
    function lactose(){
      const products = document.querySelectorAll('.product');
      products[3].style.display = 'none';
    }
    function glutton(){
      const products = document.querySelectorAll('.product');
      products[4].style.display = 'none';
      products[8].style.display = 'none';
      products[9].style.display = 'none';
    }
    function diabetic(){
      const products = document.querySelectorAll('.product');
      products[4].style.display = 'none';
      products[5].style.display = 'none';
      products[6].style.display = 'none';
    }
    function expensive(){
      const products = document.querySelectorAll('.product');
      products[6].style.display = 'none';
      products[7].style.display = 'none';
      products[8].style.display = 'none';
      products[9].style.display = 'none';
    }
    function allProduct(){
      const products = document.querySelectorAll('.product');

      products.forEach(product => {
        product.style.display = 'table-column';
      });
    }