// Load products data
const productsUrl = "./data/products.json"; // Path to the products data JSON file
let selectedProduct = null; // Variable to store the currently selected product
let cart = []; // Array to hold items added to the cart
let isLoved = false; // Track the love state
let showModal = false; // Track modal visibility

// Fetch data and render the initial product details
fetch(productsUrl)
  .then((response) => response.json())
  .then((products) => {
    selectedProduct = products[0]; // Set the first product as selected initially
    renderProductDetails(selectedProduct, products); // Render details of the selected product
  });

// Function to render the product details and cart info
function renderProductDetails(product, products) {
  const root = document.getElementById("root"); // Get the root element to display the product details
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Calculate the total items in the cart

  // Render HTML structure for the product detail page
  root.innerHTML = `
    <div class="max-w-4xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <h1 class="text-2xl font-bold mb-4 text-center">Product Detail</h1>
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 flex justify-center items-center">
          <img src="${product.imageUrl}" alt="${product.title
    }" class="w-80 h-80 object-cover rounded-md">
        </div>
        <div class="w-full md:w-1/2 pl-4">
          <h2 class="text-xl font-bold">${product.title}</h2>
          <div class="flex items-center my-2">
            <span class="text-gold mr-2">⭐⭐⭐⭐⭐</span>
            <span>(${product.reviews} out of 5)</span>
          </div>
          <div class="flex items-center my-2">
            <span class="line-through text-gray-500 mr-2">${product.oldPrice
    }</span>
            <span class="text-red-500" id="mainPrice">${product.price}</span>
          </div>
          <p class="my-2">${product.description}</p>

          <!-- Type and Model Number -->
          <div class="my-4">
            <div class="flex gap-2">
              <span class="font-bold">Type:</span>
              <span>${product.type}</span>
            </div>
            <div class="flex gap-2">
              <span class="font-bold">Model Number:</span>
              <span>${product.modelNumber}</span>
            </div>
          </div>

          <!-- Watch Color selection -->
          <div class="my-4">
            <h3 class="font-bold">Watch Color:</h3>
            <div class="flex items-center my-2">
              <button class="w-6 h-6 rounded-full bg-red-500 mr-2 border-2 border-transparent" 
                onclick="handleColorChange(0, '${productsUrl}')"></button>
              <button class="w-6 h-6 rounded-full bg-green-500 mr-2 border-2 border-transparent" 
                onclick="handleColorChange(1, '${productsUrl}')"></button>
              <button class="w-6 h-6 rounded-full bg-blue-500 mr-2 border-2 border-transparent" 
                onclick="handleColorChange(2, '${productsUrl}')"></button>
            </div>
          </div>

          <!-- Wrist Size selection -->
          <div class="my-4">
            <h3 class="font-bold">Wrist Size:</h3>
            <div class="flex items-center space-x-4">
              <button id="sizeS" class="border p-2 rounded-md text-gray-700" onclick="handleSizeChange('S', 79, 'sizeS')">S $79</button>
              <button id="sizeM" class="border p-2 rounded-md text-gray-700" onclick="handleSizeChange('M', 80, 'sizeM')">M $80</button>
              <button id="sizeL" class="border p-2 rounded-md text-gray-700" onclick="handleSizeChange('L', 89, 'sizeL')">L $89</button>
              <button id="sizeXL" class="border p-2 rounded-md text-gray-700" onclick="handleSizeChange('XL', 99, 'sizeXL')">XL $99</button>
            </div>
          </div>

          <!-- Quantity, Add to Cart, Love Icon -->
          <div class="flex items-center space-x-4 my-4">
            <div class="flex items-center">
              <button class="border p-2 text-sm rounded-md" onclick="changeQuantity(-1)">-</button>
              <span id="quantity" class="px-4 text-sm">0</span>
              <button class="border p-2 text-sm rounded-md" onclick="changeQuantity(1)">+</button>
            </div>
            <button class="bg-blue-500 text-white px-4 py-2 rounded" onclick="addToCart()">Add to Cart</button>
            <button id="loveButton" class="text-white text-2xl p-2" onclick="toggleLove()">❤️</button>
          </div>

          <!-- Checkout Button moved under card body, inside it -->
          <div class=" justify-center items-center mt-8">
            <button class="bg-yellow-500 text-black px-4 py-1 rounded shadow-md flex items-center space-x-2" onclick="showCheckoutModal()">
          <span>Checkout:</span>
          <span class="bg-white text-black px-2 py-1 rounded-md">${cartCount}</span>
          </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Cart Details -->
    ${showModal
      ? `
    <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full h-auto">
        <h2 class="text-lg font-semibold mb-4">Your Cart</h2>
        ${cart.length > 0
        ? `
        <div>
          <div class="mb-4">
            <div class="grid grid-cols-6 gap-2 text-sm font-semibold text-gray-400">
              <div>Item</div>
              <div>Color</div>
              <div>Size</div>
              <div>Qnt</div>
              <div>Price</div>
           
            </div>
          </div>
          ${cart
          .map(
            (item, index) => `
          <div key="${index}" class="grid grid-cols-6 gap-2 items-center border-b pb-2 mb-2">
            <div class="flex items-center space-x-2">
              <img src="${item.imageUrl}" alt="${item.title}" class="w-10 h-10 object-cover rounded-md" />
              <span class="font-semibold text-xs">${item.title}</span>
            </div>
            <div class="text-xs">${item.color}</div>
            <div class="text-xs">${item.size}</div>
            <div class="text-xs">${item.quantity}</div>
            <div class="text-xs">${item.price}</div>
            
          </div>
          `
          )
          .join("")}
          <div class="mt-4 grid grid-cols-6 gap-2">
            <div class="text-sm font-semibold">Total</div>
            <div></div>
            <div></div>
            <div class="text-xs font-semibold">
              ${cart.reduce((total, item) => total + item.quantity, 0)} items
            </div>
            <div class="text-xs font-semibold text-">
              Price: $${getTotalPrice()}
            </div>
            <div></div>
          </div>
        </div>
        `
        : `
        <p class="text-sm">Your cart is empty.</p>
        `
      }
        <div class="mt-4 flex justify-end space-x-4">
          <button onclick="closeCheckoutModal()" class="border border-gray-300 px-4 py-2 rounded text-sm">Continue Shopping</button>
          <button onclick="handleCheckoutClick()" class="bg-blue-500 text-white px-4 py-2 rounded text-sm">Checkout</button>
        </div>
      </div>
    </div>
    `
      : ""
    }
  `;
}

// Handle color change for the product
function handleColorChange(index, url) {
  fetch(url) // Fetch the products data again
    .then((response) => response.json())
    .then((products) => {
      selectedProduct = products[index]; // Set the selected product to the clicked color
      renderProductDetails(selectedProduct, products); // Re-render the product details with the new color

      // Add a black circular border to the selected color button
      const colorButtons = document.querySelectorAll(".w-6.h-6");
      colorButtons.forEach((button) => {
        button.classList.remove("border-black"); // Remove black border from all buttons
      });
      const selectedButton = colorButtons[index];
      selectedButton.classList.add("border-black"); // Add a black border to the selected button
    });
}

// Handle wrist size change and update the price
function handleSizeChange(size, price, buttonId) {
  selectedProduct.size = size; // Set the wrist size
  selectedProduct.price = `$${price}`; // Set the new price based on the selected size
  document.getElementById("mainPrice").textContent = selectedProduct.price; // Update the displayed price

  // Update button styles: Reset all to gray, then highlight the selected one
  document.querySelectorAll(".border").forEach((button) => {
    button.classList.remove("border-blue-500");
    button.classList.add("border-gray-300");
  });

  const selectedButton = document.getElementById(buttonId);
  selectedButton.classList.remove("border-gray-300");
  selectedButton.classList.add("border-blue-500"); // Highlight selected size button
}

// Function to adjust the quantity of the product
function changeQuantity(value) {
  const quantityEl = document.getElementById("quantity"); // Get the quantity element
  let quantity = parseInt(quantityEl.textContent, 10); // Get the current quantity

  // Update quantity, ensuring it stays within a reasonable range (e.g., 1 to 10)
  quantity = Math.max(0, quantity + value);
  quantityEl.textContent = quantity;
}

// Function to toggle the 'loved' state
function toggleLove() {
  isLoved = !isLoved; // Toggle the 'love' state
  const loveButton = document.getElementById("loveButton");
  loveButton.classList.toggle("text-red-500", isLoved); // Toggle the heart color
}

// Add the current product to the cart
function addToCart() {
  const quantity = parseInt(
    document.getElementById("quantity").textContent,
    10
  );
  if (quantity > 0) {
    cart.push({ ...selectedProduct, quantity }); // Add the product to the cart
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // Update cart count
    renderProductDetails(selectedProduct, cart); // Re-render the product details with the updated cart count
  }
}

// Calculate the total price of the cart
function getTotalPrice() {
  return cart
    .reduce(
      (total, item) => total + parseFloat(item.price.slice(1)) * item.quantity,
      0
    )
    .toFixed(2);
}

// Show the cart modal
function showCheckoutModal() {
  showModal = true; // Show the modal
  renderProductDetails(selectedProduct, cart); // Re-render the cart with the modal
}

// Close the cart modal
function closeCheckoutModal() {
  showModal = false; // Hide the modal
  renderProductDetails(selectedProduct, cart); // Re-render the product details without the modal
}

// Handle checkout button click
function handleCheckoutClick() {
  alert("Proceeding to checkout..."); // Handle the checkout logic
}
