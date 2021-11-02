import { LitElement, css, html } from "lit";

export class Flavors extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.flavors = {};
  }
  // Render the UI as a function of component state
  render() {
    if (typeof this.flavors !== "string") {
      return html``;
    }
    const { name, cpus, gpus, mem } = JSON.parse(this.flavors);
    return html`
      <p>${name} CPUs: ${cpus} GPUs: ${gpus} RAM: ${mem}</p>
      <button>select</button>
    `;
  }
}
Flavors.properties = {
  flavors: {},
};
// Define scoped styles right with your component, in plain CSS
Flavors.styles = css`
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

customElements.define("cc-flavors", Flavors);
