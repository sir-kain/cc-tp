import { LitElement, css, html } from "lit";

export class Cart extends LitElement {
  constructor() {
    super();
    this.flavor = {};
    this.variant = {};
    this.formattedPrice = 0;
  }

  formatFlavorPrice(price) {
    return price * 41.904;
  }
  render() {
    const { name: vName } = this.variant;
    const { name: fName, price } = this.flavor;
    this.formattedPrice = this.formatFlavorPrice(price);
    this.addToCart();
    return html`
      <p>${vName} - ${fName} - ${this.formattedPrice}</p>
      <button @click="${this.removeItemFromCart}">remove</button>
    `;
  }
  addToCart() {
    window.dispatchEvent(
      new CustomEvent("updateCounter", {
        detail: { price: this.formattedPrice, type: "add" },
      })
    );
  }
  removeItemFromCart() {
    this.closest("li").remove();
    window.dispatchEvent(
      new CustomEvent("updateCounter", {
        detail: { price: this.formattedPrice, type: "remove" },
      })
    );
  }
}

Cart.properties = {
  variant: { type: Object },
  flavor: { type: Object },
  formattedPrice: {
    attribute: false,
  },
};

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
