import { LitElement, css, html } from "lit";

export class Flavor extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.variant = {};
    this.flavor = {};
  }
  // Render the UI as a function of component state
  render() {
    if (typeof this.flavor !== "string") {
      return html``;
    }
    const { name, cpus, gpus, mem } = JSON.parse(this.flavor);
    return html`
      <p>${name} CPUs: ${cpus} GPUs: ${gpus} RAM: ${mem}</p>
      <button @click="${this.selectFlavor}">select</button>
    `;
  }

  selectFlavor() {
    window.dispatchEvent(
      new CustomEvent("flavorSelected", {
        detail: {
          variant: this.variant,
          flavor: this.flavor,
        },
      })
    );
  }
}
Flavor.properties = {
  variant: {},
  flavor: {},
};
// Define scoped styles right with your component, in plain CSS
Flavor.styles = css`
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

customElements.define("cc-flavor", Flavor);
