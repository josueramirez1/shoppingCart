// Get selectors
const cartBtn = document.querySelector(
  "button.fixed.top-0.right-0.mr-4.mt-4.w-12.bg-blue-500.p-2.rounded-full.text-white"
);
const svgCartBtn = document.querySelector("svg");
const shoppingCart = document.querySelector(
  "div.bg-white.text-gray-700.body-font.shadow-lg.border.rounded-lg.flex.flex-col"
);
const redCounter = document.querySelector("div.rounded-full");
const closeBtn = document.querySelectorAll("[data-remove-from-cart-button]");
const colorName = document.querySelectorAll(
  "h2.text-gray-900.text-lg.font-medium"
);
let priceItem = Array.from(
  document.querySelectorAll("div.mt-2.flex.justify-between")
).map((price) => {
  return price.children[1];
});

const addToCartBtn = document.querySelectorAll(
  "button.text-white.py-2.px-4.text-xl.bg-blue-500.rounded"
);
const colorCart = document.querySelector("div.overflow-y-auto.px-4.pt-4");

const colorBoxes = Array.from(document.querySelectorAll(".mb-6"));

let priceItems = Array.from(
  document.querySelectorAll("div.flex.items-center.title-font")
).map((counter) => {
  return counter.children[1];
});

// Converting to total price string to number to add or subtract item color prices.
let totalPriceString = document.querySelectorAll("span.font-bold")[2];
let totalPriceNum = parseInt(totalPriceString.textContent.substring(1, 3));

console.log(totalPriceNum);

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
let count = 2;
document.addEventListener("click", (e) => {
  priceItems = Array.from(
    document.querySelectorAll("div.flex.items-center.title-font")
  ).map((counter) => {
    return counter.children[1];
  });

  // If user clicks on svg button, the shopping cart will appear
  if (e.target === cartBtn || e.target === svgCartBtn) {
    shoppingCart.classList.toggle("invisible");
  }

  // If user clicks "ADD TO CART" then

  if (
    e.target.matches("button.text-white.py-2.px-4.text-xl.bg-blue-500.rounded")
  ) {
    // computer will check two conditions
    // if item is not in shopping cart add it

    // if item color is already in the shopping cart add counter and add total price

    for (let color of colorName) {
      if (e.target.closest(".mt-4") === color.closest(".mt-4")) {
        colorBoxes.map((colorBox) => {
          if (
            color.closest(".mt-4").children[0].children[1].innerText ===
            colorBox.children[1].children[0].children[0].innerText
          ) {
            // console.log(colorBox.children[1].children[0].children);
            if (colorBox.children[1].children[0].children.length === 1) {
              let span = document.createElement("span");
              span.innerText = `x2`;
              span.classList.add(
                "text-gray-600",
                "text-sm",
                "font-bold",
                "ml-1"
              );

              colorBox.children[1].children[0].append(span);
              count = 2;
              return;
            }
            if (colorBox.children[1].children[0].children.length > 1) {
              if (
                color.closest(".mt-4").children[0].children[1].innerText ===
                colorBox.children[1].children[0].children[0].innerText
              ) {
                let newCount = parseInt(
                  colorBox.children[1].children[0].children[0].nextElementSibling.innerText.substring(
                    1,
                    8
                  )
                );

                colorBox.children[1].children[0].children[0].nextElementSibling.innerText = `x${++newCount}`;
                return;
              }
            }
          }
        });
      }
    }
  }
});

// Functions

function addBlock(color) {
  return getItems().then((data) => {
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
        // colorCartNames.push(colorCart);
      }
    }
  });
}

// async function newBlock(color) {
//   await getItems().then((data) => {
//     for (let object of data) {
//       if (color.innerText === object.name) {
//         let convertToString = object.priceCents.toString();
//         let truePrice = parseInt(convertToString.substring(0, 2));
//         let newTruePrice = truePrice + truePrice;
//         colorCart.innerHTML += createColorBlock(
//           object.name,
//           newTruePrice,
//           object.imageColor
//         );
//         totalPriceNum = totalPriceNum + newTruePrice;
//         totalPriceString.textContent = `$${totalPriceNum}.00`;
//         // colorCartNames.push(colorCart);
//       }
//     }
//   });
// }

let createColorBlock = (name, price, color) => {
  let result = `<div class="mb-6"><div class="block relative h-24 rounded overflow-hidden"><img alt="ecommerce"class="object-cover object-center w-full h-full block rounded"src="https://dummyimage.com/210x130/${color}/${color}"/><button data-remove-from-cart-button class="absolute top-0 right-0 bg-black rounded-tr text-white w-6 h-6 text-lg flex justify-center items-center">&times;</button></div><div class="mt-2 flex justify-between"><div class="flex items-center title-font"><h2 class="text-gray-900 text-lg font-medium">${name}</h2><span class="text-gray-600 text-sm font-bold ml-1"></span></div><div>$${price}.00</div></div></div>`;

  return result;
};

function tagName(color) {
  let result = `<div class="flex items-center title-font">
  <h2 class="text-gray-900 text-lg font-medium">${color}</h2>
  <span class="text-gray-600 text-sm font-bold ml-1">x2</span>
</div>`;

  return result;
}

function timesNum() {
  let result = `<span class="text-gray-600 text-sm font-bold ml-1">x2</span>`;
  return result;
}
