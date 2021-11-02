import { LitElement, css, html } from "lit";

export class Cart extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.flavor = {};
    this.variant = {};
  }
  // Render the UI as a function of component state
  render() {
    if (typeof this.flavor !== "string") {
      return html``;
    }
    const { name } = JSON.parse(this.flavor);
    return html`
      <p>${name}</p>
      <button>remove</button>
    `;
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
