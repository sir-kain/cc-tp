import "./style.css";
import "./components/variant";
import "./components/flavor";
import "./components/cart";
import "./components/counter";

function $(selector) {
  return document.querySelector(selector);
}
function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}
async function getVariants() {
  let variants = [];
  try {
    const response = await fetch(
      "https://api.clever-cloud.com/v2/products/instances"
    );
    if (!response.ok) {
      throw response;
    }
    variants = await response.json();
  } catch (error) {
    console.error("getVariants =>", error);
  }
  return variants;
}

window.addEventListener("DOMContentLoaded", async () => {
  const variants = await getVariants();
  const $ul = $("#variants");
  variants.forEach(({ variant, flavors }) => {
    const $li = createNode("li");
    const $ccVariant = createNode("cc-variant");
    $ccVariant.setAttribute("variant", JSON.stringify(variant));
    $ccVariant.setAttribute("flavors", JSON.stringify(flavors));
    append($li, $ccVariant);
    append($ul, $li);
  });
});

window.addEventListener("variantSelected", (e) => {
  const $ul = $("#flavors");
  $ul.innerHTML = "";
  const { variant, flavors } = e.detail;
  flavors.forEach((flavor) => {
    const $li = createNode("li");
    const $ccFlavor = createNode("cc-flavor");
    $ccFlavor.setAttribute("variant", JSON.stringify(variant));
    $ccFlavor.setAttribute("flavor", JSON.stringify(flavor));
    append($li, $ccFlavor);
    append($ul, $li);
  });
});

window.addEventListener("flavorSelected", (e) => {
  const $ul = $("#cart");
  const { variant, flavor } = e.detail;
  const $li = createNode("li");
  const $ccCart = createNode("cc-cart");
  $ccCart.setAttribute("variant", JSON.stringify(variant));
  $ccCart.setAttribute("flavor", JSON.stringify(flavor));
  append($li, $ccCart);
  append($ul, $li);
});

// =================================
// Dinerojs version that not working
// Blocked by TypeError: a.cmp is not a function
// Maybe https://github.com/dinerojs/dinero.js/issues/58 should help
// =================================
// window.addEventListener("updateCounter", async (e) => {
//   const $counter = $("#counter");
//   const total = parseFloat($counter.getAttribute("total"));
//   let { price, action } = e.detail;

//   const { Big } = await import("big.js");
//   const { createDinero, add, toSnapshot, subtract } = await import("dinero.js");
//   const { EUR } = await import("@dinero.js/currencies");

//   const calculator = {
//     add: (a, b) => a.plus(b),
//     compare: (a, b) => a.cmp(b),
//     decrement: (v) => v.minus(new Big(1)),
//     increment: (v) => v.plus(new Big(1)),
//     integerDivide: (a, b) => a.div(b).round(0, Big.roundDown),
//     modulo: (a, b) => a.mod(b),
//     multiply: (a, b) => a.times(b),
//     power: (a, b) => a.pow(Number(b)),
//     subtract: (a, b) => a.minus(b),
//     toNumber: (v) => v.toNumber(),
//     zero: () => new Big(0),
//   };
//   const dineroBigint = createDinero({ calculator });
//   price = dineroBigint({ amount: price, currency: EUR });
//   let result = dineroBigint({ amount: total, currency: EUR });

//   switch (action) {
//     case "add":
//       result = toSnapshot(add(result, price)).amount;
//       break;
//     case "remove":
//       result = toSnapshot(subtract(result, price)).amount;
//       break;
//   }
//   $counter.innerHTML = result;
//   $counter.setAttribute("total", result);
// });

window.addEventListener("updateCounter", async (e) => {
  const $counter = $("#counter");
  const total = parseFloat($counter.getAttribute("total"));
  let { price, action } = e.detail;
  let result = total;
  switch (action) {
    case "add":
      result += price;
      break;
    case "remove":
      result -= price;
      break;
  }
  $counter.innerHTML = result;
  $counter.setAttribute("total", result);
});

window.addEventListener("updateCounter", async (e) => {
  $("cc-counter").setAttribute("price", e.detail.price);
});
