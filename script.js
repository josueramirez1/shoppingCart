// Get selectors
const cartBtn = document.querySelector("button.fixed");
const redCounter = document.querySelector("div.rounded-full");
const closeBtn = document.querySelectorAll("[data-remove-from-cart-button]");
const color = document.querySelectorAll("h2.text-gray-900.text-lg.font-medium");
const redItemPrice = document.querySelectorAll(
  "div.flex.items-center.title-font"
)[0].nextElementSibling;
const blueItemPrice = document.querySelectorAll(
  "div.flex.items-center.title-font"
)[1].nextElementSibling;
