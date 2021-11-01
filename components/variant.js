import { LitElement, css, html } from "lit";

export class Variant extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.name = "World";
  }

  // Render the UI as a function of component state
  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
Variant.properties = {
  name: {},
};
// Define scoped styles right with your component, in plain CSS
Variant.styles = css`
  :host {
    color: blue;
  }
`;
customElements.define("cc-variant", Variant);
