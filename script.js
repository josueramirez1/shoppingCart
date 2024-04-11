// Get selectors
const cartBtn = document.querySelector(
  "button.fixed.top-0.right-0.mr-4.mt-4.w-12.bg-blue-500.p-2.rounded-full.text-white"
);
const svgCartBtn = document.querySelector("svg");
const redCounter = document.querySelector("div.rounded-full");
const closeBtn = document.querySelectorAll("[data-remove-from-cart-button]");
const colorName = document.querySelectorAll(
  "h2.text-gray-900.text-lg.font-medium"
);
const redItemPrice = document.querySelectorAll(
  "div.flex.items-center.title-font"
)[0].nextElementSibling;
const blueItemPrice = document.querySelectorAll(
  "div.flex.items-center.title-font"
)[1].nextElementSibling;
const addToCartBtn = document.querySelectorAll(
  "button.text-white.py-2.px-4.text-xl.bg-blue-500.rounded"
);
const colorCart = document.querySelector("div.overflow-y-auto.px-4.pt-4");

let colorCartNames = Array.from(
  document.querySelectorAll("div.flex.items-center.title-font")
).map((color) => {
  return color.children[0];
});

// Converting to total price string to number to add or subtract item color prices.
let totalPriceString = document.querySelectorAll("span.font-bold")[2];
let totalPriceNum = parseInt(totalPriceString.textContent.substring(1, 3));

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

document.addEventListener("click", (e) => {
  // If user clicks on svg button, the shopping cart will appear
  if (e.target === cartBtn || e.target === svgCartBtn) {
    shoppingCart.classList.toggle("invisible");
  }

  // If user clicks "ADD TO CART" then

  if (
    e.target.matches("button.text-white.py-2.px-4.text-xl.bg-blue-500.rounded")
  ) {
    colorCartNames = Array.from(
      document.querySelectorAll("div.flex.items-center.title-font")
    ).map((color) => {
      return color.children[0];
    });
    // computer will check two conditions
    // if item color is already in the shopping cart add counter and add total price

    for (let color of colorName) {
      if (e.target.closest(".mt-4") === color.closest(".mt-4")) {
        for (let colorCartName of colorCartNames)
          if (e.target.closest(".mt-4") === color.closest(".mt-4")) {
            if (color.innerText === colorCartName.innerText) {
              console.log(true);
            }
          }
        // if item color is not already in the shopping cart, add it.
        getItems().then((data) => {
          for (let object of data) {
            if (color.innerText === object.name) {
              let convertToString = object.priceCents.toString();
              let truePrice = parseInt(convertToString.substring(0, 2));

              colorCart.innerHTML += createColorBlock(
                object.name,
                truePrice,
                object.imageColor
              );

              totalPriceNum = totalPriceNum + truePrice;
              totalPriceString.textContent = `$${totalPriceNum}.00`;

              colorCartNames.push(colorCart);
              console.log(colorCartNames);
            }
          }
        });
      }
    }
  }
});

// Functions

function createColorBlock(name, price, color) {
  // let convertToString = price.toString();
  // let truePrice = parseInt(convertToString.substring(0, 2));

  let result = `<div class="mb-6"><div class="block relative h-24 rounded overflow-hidden"><img alt="ecommerce"class="object-cover object-center w-full h-full block rounded"src="https://dummyimage.com/210x130/${color}/${color}"/><button data-remove-from-cart-button class="absolute top-0 right-0 bg-black rounded-tr text-white w-6 h-6 text-lg flex justify-center items-center">&times;</button></div><div class="mt-2 flex justify-between"><div class="flex items-center title-font"><h2 class="text-gray-900 text-lg font-medium">${name}</h2><span class="text-gray-600 text-sm font-bold ml-1"></span></div><div>$${price}.00</div></div></div>`;

  return result;
}
