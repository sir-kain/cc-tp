import "./style.css";
import "./components/variant";
import "./components/flavor";
import "./components/cart";
import variants from "./data/index.json";

function $(selector) {
  return document.querySelector(selector);
}
function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}
// async function getVariants() {
//   let variants = [];
//   try {
//     const response = await fetch(
//       "https://api.clever-cloud.com/v2/products/instances"
//     );
//     if (!response.ok) {
//       throw response;
//     }
//     variants = await response.json();
//   } catch (error) {
//     console.error("getVariants =>", error);
//   }
//   return variants;
// }

window.addEventListener("DOMContentLoaded", async () => {
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

window.addEventListener("updateCounter", async (e) => {
  const $counter = $("#counter");
  const total = parseFloat($counter.getAttribute("total"));
  let { price, action } = e.detail;
  const { calculator } = await import(
    "./node_modules/@dinero.js/calculator-bigint/dist/esm/calculator"
  );
  const { createDinero, add, toSnapshot, subtract } = await import("dinero.js");
  const { EUR } = await import("@dinero.js/currencies");
  const dineroBigint = createDinero({ calculator });

  price = dineroBigint({ amount: price, currency: EUR });
  let result = dineroBigint({ amount: total, currency: EUR });

  switch (action) {
    case "add":
      result = toSnapshot(add(result, price)).amount;
      break;
    case "remove":
      result = toSnapshot(subtract(result, price)).amount;
      break;
  }
  $counter.innerHTML = result;
  $counter.setAttribute("total", result);
});
