import "./style.css";
import "./components/variant";
import "./components/flavor";
import "./components/cart";
import response from "./data";

function $(selector) {
  return document.querySelector(selector);
}
function createNode(element) {
  return document.createElement(element);
}
function append(parent, el) {
  return parent.appendChild(el);
}

window.addEventListener("DOMContentLoaded", async () => {
  const $ul = $("#variants");
  response.forEach((obj) => {
    const variant = obj.variant;
    const flavors = obj.flavors;
    const $li = createNode("li");
    const $ccVariant = createNode("cc-variant");
    $ccVariant.setAttribute("variant", JSON.stringify(variant));
    $ccVariant.setAttribute("flavors", JSON.stringify(flavors));
    append($li, $ccVariant);
    append($ul, $li);
  });
  // try {
  //   const response = await fetch(
  //     "https://api.clever-cloud.com/v2/products/instance",
  //     {
  //       headers: {
  //         contentType: "application/json",
  //         accept: "json",
  //       },
  //     }
  //   );
  //   if (response.ok) {
  //     const variant = await response.json();
  //     console.log("variant ==>", variant);
  //   } else {
  //     throw response;
  //   }
  // } catch (error) {
  //   console.log("error ==>", error);
  // }
});

window.addEventListener("variantSelected", (e) => {
  const $ul = $("#flavors");
  $ul.innerHTML = "";
  const { variant, flavors } = e.detail;
  flavors.forEach((flavor) => {
    const $li = createNode("li");
    const $ccFlavor = createNode("cc-flavor");
    $ccFlavor.setAttribute("variant", variant);
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
  $ccCart.setAttribute("variant", variant);
  $ccCart.setAttribute("flavor", flavor);
  append($li, $ccCart);
  append($ul, $li);
});

window.addEventListener("incrementPrice", (e) => {
  const $counter = $("#counter");
  const total = parseFloat($counter.getAttribute("total"));
  const { price } = e.detail;
  const result = total + price;
  $counter.innerHTML = result;
  $counter.setAttribute("total", result);
});
window.addEventListener("decrementPrice", (e) => {
  const $counter = $("#counter");
  const total = parseFloat($counter.getAttribute("total"));
  const { price } = e.detail;
  const result = Math.max(0, total - price);
  $counter.innerHTML = result;
  $counter.setAttribute("total", result);
});
