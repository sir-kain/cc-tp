import { LitElement, css, html } from "lit";

export class Variant extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.variant = {};
  }
  // Render the UI as a function of component state
  render() {
    if (typeof this.variant !== "string") {
      return;
    }
    const { name, logo } = JSON.parse(this.variant);
    return html`
      <img src="${logo}" alt="${name}" width="30" height="30" />
      <span>${name}</span>
      <button>select</button>
    `;
  }
}
Variant.properties = {
  variant: {},
};
// Define scoped styles right with your component, in plain CSS
Variant.styles = css`
  :host {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  span {
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
customElements.define("cc-variant", Variant);
