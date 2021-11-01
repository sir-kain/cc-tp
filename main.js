import "./style.css";
import "./components/variant";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://api.clever-cloud.com/v2/products/instance"
    );
    if (response.ok) {
      const variant = await response.json();
      console.log("variant ==>", variant);
    } else {
      throw response;
    }
  } catch (error) {
    console.log("error ==>", error);
  }
});
