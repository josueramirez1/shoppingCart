// Get selectors
const cartBtn = document.querySelector(
  "button.fixed.top-0.right-0.mr-4.mt-4.w-12.bg-blue-500.p-2.rounded-full.text-white"
);
const svgCartBtn = document.querySelector("svg");
const shoppingCart = document.querySelector(
  "div.bg-white.text-gray-700.body-font.shadow-lg.border.rounded-lg.flex.flex-col"
);
let redCounter = document.querySelector("div.rounded-full");
const closeBtn = document.querySelectorAll("[data-remove-from-cart-button]");

const colorName = document.querySelectorAll(
  "h2.text-gray-900.text-lg.font-medium"
);
let singleItemPrice = Array.from(
  document.querySelectorAll("div.mt-2.flex.justify-between")
).map((price) => {
  return price.children[1];
});

const colorCart = document.querySelector("div.overflow-y-auto.px-4.pt-4");
const cartBox = document.querySelector(
  "div.bg-white.text-gray-700.body-font.shadow-lg.border.rounded-lg.flex.flex-col"
);

let colorBoxes = Array.from(document.querySelectorAll(".mb-6"));
// Converting to total price string to number to add or subtract item color prices.
let totalPriceString = document.querySelectorAll("span.font-bold")[2];
let totalPriceNum = parseInt(totalPriceString.textContent.substring(1, 3));

let singleItemPriceNum = singleItemPrice.map((price) => {
  return parseInt(price.textContent.substring(1, 3));
});

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
  colorBoxes = Array.from(document.querySelectorAll(".mb-6"));

  // If user clicks on svg button, the shopping cart will appear
  if (e.target === cartBtn || e.target === svgCartBtn) {
    shoppingCart.classList.toggle("invisible");
  }

  // If user clicks "ADD TO CART" then

  if (
    e.target.matches("button.text-white.py-2.px-4.text-xl.bg-blue-500.rounded")
  ) {
    for (let color of colorName) {
      // if user clicks "ADD TO CART"...
      if (e.target.closest(".mt-4") === color.closest(".mt-4")) {
        colorBoxes.forEach((colorBox) => {
          // and if items is already in shopping cart...
          if (
            color.closest(".mt-4").children[0].children[1].innerText ===
            colorBox.children[1].children[0].children[0].innerText
          ) {
            // if item does not contain a counter, add a counter
            if (colorBox.children[1].children[0].children.length === 1) {
              let span = document.createElement("span");
              span.innerText = `x${count}`;
              span.classList.add(
                "text-gray-600",
                "text-sm",
                "font-bold",
                "ml-1"
              );

              colorBox.children[1].children[0].append(span);
              addSingleAndTotal(color, colorBox);

              count = 2;
              return;
            }
            // or if item already has a counter, continue adding up
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
                addSingleAndTotal(color, colorBox);
                colorBox.children[1].children[0].children[0].nextElementSibling.innerText = `x${++newCount}`;
                return;
              }
            }
          }
        });
      }
      // If user clicks 'ADD TO CART'...
      if (e.target.closest(".mt-4") === color.closest(".mt-4")) {
        let newColorBoxes = colorBoxes.filter((colorBox) => {
          return (
            // then check if color is in shopping cart. if item equals the color add it to new var
            colorBox.children[1].children[0].children[0].innerText ===
            e.target.previousElementSibling.children[1].innerText
          );
        });
        // if new array does not have a duplicate, add a new color block
        if (newColorBoxes.length === 0) {
          let numRedCounter = parseInt(redCounter.innerText) + 1;
          redCounter.innerText = numRedCounter;
          if (numRedCounter === 1) {
            cartBox.classList.remove("invisible");
          }
          addBlock(color);
        }
      }
    }
  }
});

// Close button
document.addEventListener("click", (e) => {
  for (let color of colorName) {
    for (let colorBox of colorBoxes) {
      // if user clicks on specific close box button...

      if (e.target.closest(".mb-6") === colorBox.closest(".mb-6")) {
        if (
          color.closest(".mt-4").children[0].children[1].innerText ===
          colorBox.children[1].children[0].children[0].innerText
        ) {
          let subRedCounter = parseInt(redCounter.innerText) - 1;
          redCounter.innerText = subRedCounter;
          subtractSingleAndTotal(color, colorBox);
          // If the red counter turns to zero
          if (subRedCounter === 0) {
            cartBox.classList.add("invisible");
          }
          return colorBox.remove();
        }
      }
    }
  }
});

// Functions

function addBlock(color) {
  return (
    getItems().then((data) => {
      for (let object of data) {
        if (color.innerText === object.name) {
          let convertToString = object.priceCents.toString();
          let truePrice = parseInt(convertToString.substring(0, 2));
          let cBox = document.createElement("div");
          cBox.classList.add("mb-6");
          cBox.innerHTML = createColorBlock(
            object.name,
            truePrice,
            object.imageColor
          );
          totalPriceNum = totalPriceNum + truePrice;
          totalPriceString.textContent = `$${totalPriceNum}.00`;
          colorCart.append(cBox);

          // console.log(cBox);
          // let box = (colorCart.innerHTML += createColorBlock(
          //   object.name,
          //   truePrice,
          //   object.imageColor
          // ));
        }
      }
    }),
    { once: "true" }
  );
}

function addSingleAndTotal(color, colorBox) {
  getItems().then((data) => {
    for (let object of data) {
      if (color.innerText === object.name) {
        let convertToString = object.priceCents.toString();
        let truePrice = parseInt(convertToString.substring(0, 2));
        let singlePriceItem = parseInt(
          colorBox.children[1].children[1].innerText.substring(1, 8)
        );
        let totalSinglePriceItem = singlePriceItem + truePrice;
        colorBox.children[1].children[1].textContent = `$${totalSinglePriceItem}.00`;
        totalPriceNum = totalPriceNum + truePrice;
        totalPriceString.textContent = `$${totalPriceNum}.00`;
      }
    }
  });
}

function subtractSingleAndTotal(color, colorBox) {
  getItems().then((data) => {
    for (let object of data) {
      if (color.innerText === object.name) {
        let convertToString = object.priceCents.toString();
        let truePrice = parseInt(convertToString.substring(0, 2));
        if (colorBox.children[1].children[0].children.length > 1) {
          let newCount = parseInt(
            colorBox.children[1].children[0].children[0].nextElementSibling.innerText.substring(
              1,
              8
            )
          );

          let addedPrice = truePrice * newCount;
          totalPriceNum = totalPriceNum - addedPrice;
          totalPriceString.textContent = `$${totalPriceNum}.00`;
        } else totalPriceNum = totalPriceNum - truePrice;
        totalPriceString.textContent = `$${totalPriceNum}.00`;
      }
    }
  });
}

let createColorBlock = (name, price, color) => {
  let result = `<div class="block relative h-24 rounded overflow-hidden"><img alt="ecommerce"class="object-cover object-center w-full h-full block rounded"src="https://dummyimage.com/210x130/${color}/${color}"/><button data-remove-from-cart-button class="absolute top-0 right-0 bg-black rounded-tr text-white w-6 h-6 text-lg flex justify-center items-center">&times;</button></div><div class="mt-2 flex justify-between"><div class="flex items-center title-font"><h2 class="text-gray-900 text-lg font-medium">${name}</h2></div><div>$${price}.00</div></div>`;

  return result;
};

function tagName(color) {
  let result = `<div class="flex items-center title-font">
  <h2 class="text-gray-900 text-lg font-medium">${color}</h2>
  <span class="text-gray-600 text-sm font-bold ml-1">x2</span>
</div>`;

  return result;
}
