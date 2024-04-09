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

document.addEventListener("click", (e) => {
  if (e.target === cartBtn || e.target === svgCartBtn) {
    console.log("true");
  }
});
