import { LitElement, css, html } from "lit";

export class Variant extends LitElement {
  constructor() {
    super();
    this.variant = {};
    this.flavors = [];
  }
  render() {
    const { name, logo } = this.variant;
    console.log("this.variant ==>", this.variant);
    return html`
      <img src="${logo}" alt="${name}" width="30" height="30" loading="lazy" />
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
