import { LitElement, css, html } from "lit";

export class Cart extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.flavor = {};
    this.variant = {};
  }

  formatFlaforPrice(price) {
    return price * 41.904;
  }
  // Render the UI as a function of component state
  render() {
    if (typeof this.flavor !== "string" || typeof this.variant !== "string") {
      return html``;
    }
    const { name: vName } = JSON.parse(this.variant);
    const { name: fName, price } = JSON.parse(this.flavor);
    return html`
      <p>${vName} - ${fName} - ${this.formatFlaforPrice(price)}</p>
      <button @click="${this.removeItemFromCart}">remove</button>
    `;
  }

  removeItemFromCart() {
    this.closest("li").remove();
    window.dispatchEvent(
      new CustomEvent("itemRemoved", { detail: JSON.parse(this.flavor) })
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
