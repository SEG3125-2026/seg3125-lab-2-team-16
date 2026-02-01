// Centralized product data structure
// Refactored product management system to use a single source of truth for all product information

const productsData = [
  {
    id: 0,
    name: "Carrots",
    price: 1.49,
    image: "./img/carrot.png",
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      lactoseFree: true,
      diabetic: true
    },
    organic: false,
    budgetFriendly: true
  },
  {
    id: 1,
    name: "Broccoli",
    price: 1.99,
    image: "./img/broccoli.png",
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      lactoseFree: true,
      diabetic: true
    },
    organic: true,
    budgetFriendly: true
  },
  {
    id: 2,
    name: "Apples",
    price: 2.49,
    image: "./img/apples.png",
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      lactoseFree: true,
      diabetic: false
    },
    organic: true,
    budgetFriendly: true
  },
  {
    id: 3,
    name: "Milk",
    price: 2.79,
    image: "./img/milk.png",
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      lactoseFree: false,
      diabetic: true
    },
    organic: false,
    budgetFriendly: true
  },
  {
    id: 4,
    name: "Whole Wheat Bread",
    price: 2.99,
    image: "./img/bread.png",
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: false,
      lactoseFree: true,
      diabetic: false
    },
    organic: false,
    budgetFriendly: true
  },
  {
    id: 5,
    name: "White Rice",
    price: 3.99,
    image: "./img/rice.png",
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      lactoseFree: true,
      diabetic: false
    },
    organic: false,
    budgetFriendly: true
  },
  {
    id: 6,
    name: "Gluten-Free Bread",
    price: 4.99,
    image: "./img/g-bread.png",
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      lactoseFree: true,
      diabetic: false
    },
    organic: false,
    budgetFriendly: false
  },
  {
    id: 7,
    name: "Organic Eggs",
    price: 5.49,
    image: "./img/egg.png",
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      lactoseFree: true,
      diabetic: true
    },
    organic: true,
    budgetFriendly: false
  },
  {
    id: 8,
    name: "Chicken Breast",
    price: 6.99,
    image: "./img/chicken.png",
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      lactoseFree: true,
      diabetic: true
    },
    organic: false,
    budgetFriendly: false
  },
  {
    id: 9,
    name: "Salmon Fillet",
    price: 8.99,
    image: "./img/samon.png",
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      lactoseFree: true,
      diabetic: true
    },
    organic: false,
    budgetFriendly: false
  }
];

// Get product by ID
function getProductById(id) {
  return productsData.find(product => product.id === id);
}

// Get all products sorted by price (ascending)
function getProductsSortedByPrice() {
  return [...productsData].sort((a, b) => a.price - b.price);
}

// Filter products based on dietary restrictions and preferences
function filterProducts(dietaryRestrictions = [], organicPreference = null) {
  let filtered = [...productsData];
  
  // Apply dietary filters
  dietaryRestrictions.forEach(restriction => {
    switch(restriction) {
      case 'vegetarian':
        filtered = filtered.filter(p => p.dietary.vegetarian);
        break;
      case 'vegan':
        filtered = filtered.filter(p => p.dietary.vegan);
        break;
      case 'gluten':
        filtered = filtered.filter(p => p.dietary.glutenFree);
        break;
      case 'lactose':
        filtered = filtered.filter(p => p.dietary.lactoseFree);
        break;
      case 'diabetes':
        filtered = filtered.filter(p => p.dietary.diabetic);
        break;
      case 'expense':
        filtered = filtered.filter(p => p.budgetFriendly);
        break;
    }
  });
  
  // Apply organic preference
  if (organicPreference === 'organic') {
    filtered = filtered.filter(p => p.organic);
  } else if (organicPreference === 'non-organic') {
    filtered = filtered.filter(p => !p.organic);
  }
  // If 'na', show all products regardless of organic status
  
  // Always sort by price
  return filtered.sort((a, b) => a.price - b.price);
}
