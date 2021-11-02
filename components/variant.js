import { LitElement, css, html } from "lit";

export class Variant extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.variant = {};
    this.flavors = [];
  }
  // Render the UI as a function of component state
  render() {
    const { name, logo } = this.variant;
    return html`
      <img src="${logo}" alt="${name}" width="30" height="30" />
      <span>${name}</span>
      <button @click="${this.selectVariant}">select</button>
    `;
  }

  selectVariant() {
    window.dispatchEvent(
      new CustomEvent("variantSelected", {
        detail: { variant: this.variant, flavors: this.flavors },
      })
    );
  }
}
Variant.properties = {
  variant: { type: Object },
  flavors: { type: Array },
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
