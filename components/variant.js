import { LitElement, css, html } from "lit";

export class Variant extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.variant = {};
    this.flavors = {};
  }
  // Render the UI as a function of component state
  render() {
    if (typeof this.variant !== "string") {
      return html``;
    }
    const { name, logo } = JSON.parse(this.variant);
    return html`
      <img src="${logo}" alt="${name}" width="30" height="30" />
      <span>${name}</span>
      <button @click="${this.selectVariant}">select</button>
    `;
  }

  selectVariant() {
    if (typeof this.flavors !== "string") {
      return;
    }
    window.dispatchEvent(
      new CustomEvent("variantSelected", {
        detail: { variant: this.variant, flavors: JSON.parse(this.flavors) },
      })
    );
  }
}
Variant.properties = {
  variant: {},
  flavors: {},
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
