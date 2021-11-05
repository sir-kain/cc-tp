import "./style.css";
import "./components/variant";
import "./components/flavor";
import "./components/cart";
import Big from "big.js";

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
    const response = await fetch("./data/index.json");
    if (!response.ok) {
      throw response;
    }
    variants = await response.json();
  } catch (error) {
    console.error("getVariants ==>", error);
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

window.addEventListener("updateCounter", (e) => {
  const $counter = $("#counter");
  const total = parseFloat($counter.getAttribute("total"));
  let { price, action } = e.detail;
  price = new Big(price);
  let result = new Big(total);

  switch (action) {
    case "add":
      result = result.plus(price);
      break;
    case "remove":
      result = result.minus(price);
      break;
  }
  $counter.innerHTML = result;
  $counter.setAttribute("total", result);
});
