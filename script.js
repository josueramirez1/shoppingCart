// Get selectors
const cartBtn = document.querySelector(
  "button.fixed.top-0.right-0.mr-4.mt-4.w-12.bg-blue-500.p-2.rounded-full.text-white"
);
const svgCartBtn = document.querySelector("svg");
const redCounter = document.querySelector("div.rounded-full");
const closeBtn = document.querySelectorAll("[data-remove-from-cart-button]");
const color = document.querySelectorAll("h2.text-gray-900.text-lg.font-medium");
const redItemPrice = document.querySelectorAll(
  "div.flex.items-center.title-font"
)[0].nextElementSibling;
const blueItemPrice = document.querySelectorAll(
  "div.flex.items-center.title-font"
)[1].nextElementSibling;

const addToCartBtn = document.querySelectorAll(
  "button.text-white.py-2.px-4.text-xl.bg-blue-500.rounded"
);
const shoppingCart = document.querySelector(
  "div.bg-white.text-gray-700.body-font.shadow-lg.border.rounded-lg.flex.flex-col"
);

// FETCH Json data
async function getItems(num) {
  try {
    const response = await fetch("items.json");
    if (response.ok) {
      const user = await response.json();
      return user;
    } else console.warn("Error");
  } catch (error) {
    console.error(error);
  }
}

// Removes cart by default (unless local storage has it saved)
// cartBtn.classList.add("invisible");

// If user clicks on add to cart button, a color block with price will be added to the shopping cart
document.addEventListener("click", (e) => {
  if (e.target === cartBtn || e.target === svgCartBtn) {
    shoppingCart.classList.toggle("invisible");
  }

  if (
    e.target.matches("button.text-white.py-2.px-4.text-xl.bg-blue-500.rounded")
  ) {
  }
});

// Functions

function createColorBlock() {
  let img = document.createElement("img");
  img.setAttribute("alt", "ecommerce");
  console.log(img);
}
