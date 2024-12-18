# Product Details Page

This project is a dynamic and responsive **Product Details Page** built using **HTML**, **CSS**, **JavaScript**, and **Tailwind CSS**. The page fetches product data from a local JSON file and renders product details dynamically. It includes features like adding items to a cart, selecting colors and sizes, adjusting quantities, and displaying a modal for cart details.

---

## 🛠️ Features

- **Dynamic Product Rendering**: Fetches product data from `products.json` and displays it dynamically.
- **Interactive Color and Size Selection**: Users can choose product colors and sizes, which update the displayed details.
- **Add to Cart Functionality**: Includes quantity adjustment and cart management.
- **Checkout Modal**: Displays cart items, quantities, and total price in a modal.
- **Responsive Design**: Styled with Tailwind CSS to ensure compatibility across different screen sizes.
- **Love Toggle**: A heart icon to "love" a product, with a visual indicator.

---

## 📂 Project Structure
/project-directory │ ├── index.html # Main HTML file for the project ├── script.js # JavaScript file containing dynamic logic ├── style.css # Optional CSS file (Tailwind is primarily used) ├── /data │ └── products.json # JSON file containing product data └── README.md # This README file


---

##  LiveLink for this HtML + JavaScript Project
(https://assignment-watch-html-js.vercel.app/)


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo-name.git


2. Navigate to the Project Directory

cd project-directory

3. Open the Project
Simply open index.html in your preferred browser.


📄 File Descriptions
1. index.html
The main HTML file that serves as the entry point. It includes links to:

Tailwind CSS: For styling.
script.js: Contains JavaScript logic.
style.css: For additional styling (if needed).
2. script.js
Contains all the dynamic logic for the project, including:

Fetching product data from products.json.
Rendering product details dynamically.
Handling cart actions (add/remove).
Updating the UI for color and size selections.
Managing the checkout modal.
3. products.json
A JSON file containing an array of product objects. Each object includes:

imageUrl: The product image URL.
title: The product name.
rating: Product rating.
reviews: Number of reviews.
price: Current price.
oldPrice: Original price.
color: Color of the product.
description: A brief description.
type: Product category.
modelNumber: Model identifier.
4. style.css (Optional)
Use this file for any custom CSS that complements Tailwind styles.

📦 Dependencies
Tailwind CSS - A utility-first CSS framework for styling.


🔧 How It Works
The product data is loaded from products.json using fetch().
The first product is displayed by default.
Users can interact with:
Color buttons to change the product variant.
Size buttons to see pricing for different sizes.
Quantity buttons to add or remove items.
Clicking Add to Cart adds the item to the cart.
Checkout Modal displays cart details, and users can proceed with checkout.
 