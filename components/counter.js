import { LitElement, css, html } from "lit";

export class Counter extends LitElement {
  constructor() {
    super();
    this.price = 0;
    this.total = 0;
  }
  render() {
    console.log("this.price ==>", this.price);
    // this.total = this.total + parseFloat(this.price);
    return html`${this.total}`;
  }
  increment() {}
  decrement() {}
}
Counter.properties = {
  price: {
    hasChanged() {
      return true;
    },
    converter: (value, type) => {
      return parseFloat(value) * 41.904;
    },
  },
  action: { type: String },
};
Counter.styles = css`
  :host {
  }
`;

customElements.define("cc-counter", Counter);
