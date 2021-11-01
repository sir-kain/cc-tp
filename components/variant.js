import { LitElement, css, html } from "lit";

export class Variant extends LitElement {
  constructor() {
    super();
    // Declare reactive properties
    this.name = "World";
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <img
        src="https://via.placeholder.com/30"
        alt="#"
        width="30"
        height="30"
      />
      <span>description description</span>
      <button>select</button>
    `;
  }
}
Variant.properties = {
  name: {},
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
