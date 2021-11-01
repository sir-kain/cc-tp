import "./style.css";
import "./components/variant";
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
  //     "https://api.clever-cloud.com/v2/products/instance"
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

window.addEventListener("flavorsSelected", function (e) {
  const flavors = e.detail;
  console.log("flavors ==>", flavors);
});
