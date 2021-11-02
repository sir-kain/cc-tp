import { LitElement, css, html } from "lit";

export class Cart extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.flavors = {};
    this.variant = {};
  }
  // Render the UI as a function of component state
  render() {
    // if (typeof this.flavors !== "string" || typeof this.variant !== "string") {
    //   return html``;
    // }
    // const { name, cpus, gpus, mem } = JSON.parse(this.flavors);
    // <p>${name} CPUs: ${cpus} GPUs: ${gpus} RAM: ${mem}</p>
    return html`
      <p>okko</p>
      <button>remove</button>
    `;
  }
}
Cart.properties = {
  flavors: {},
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
