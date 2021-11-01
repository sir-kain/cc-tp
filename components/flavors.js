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
    const { name } = JSON.parse(this.flavors);
    console.log("name ==>", name);
    return html`
      <p>${name} CPUs: 1 CPUs: 0 RAM:256</p>
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
