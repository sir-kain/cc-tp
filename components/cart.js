import { LitElement, css, html } from "lit";

export class Cart extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.flavor = {};
    this.variant = {};
    this.formattedPrice = 0;
  }

  formatFlavorPrice(price) {
    return price * 41.904;
  }
  // Render the UI as a function of component state
  render() {
    if (typeof this.flavor !== "string" || typeof this.variant !== "string") {
      return html``;
    }
    const { name: vName } = JSON.parse(this.variant);
    const { name: fName, price } = JSON.parse(this.flavor);
    this.formattedPrice = this.formatFlavorPrice(price);
    this.addToCart();
    return html`
      <p>${vName} - ${fName} - ${this.formattedPrice}</p>
      <button @click="${this.removeItemFromCart}">remove</button>
    `;
  }

  addToCart() {
    window.dispatchEvent(
      new CustomEvent("incrementPrice", {
        detail: { price: this.formattedPrice },
      })
    );
  }
  removeItemFromCart() {
    this.closest("li").remove();
    window.dispatchEvent(
      new CustomEvent("decrementPrice", {
        detail: { price: this.formattedPrice },
      })
    );
  }
}
Cart.properties = {
  flavor: {},
  variant: {},
};
// Define scoped styles right with your component, in plain CSS
Cart.styles = css`
  p {
    margin: 0;
    padding: 0;
  }
  :host {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  p {
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  button {
    padding: 2px 5px;
    border-radius: 4px;
  }
`;

customElements.define("cc-cart", Cart);
