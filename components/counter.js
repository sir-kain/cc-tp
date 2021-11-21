import { LitElement, css, html } from "lit";

export class Counter extends LitElement {
  constructor() {
    super();
    this.price = 0;
    this.action = "";
    this.total = 0;
  }
  render() {
    this.performTotal();
    return html`<span>${this.total}</span>`;
  }
  increment() {
    this.total += this.price;
  }
  decrement() {
    this.total -= this.price;
  }
  performTotal() {
    switch (this.action) {
      case "add":
        this.increment();
        break;
      case "remove":
        this.decrement();
        break;
    }
  }
}
Counter.properties = {
  price: {
    hasChanged() {
      return true;
    },
    converter: (value) => {
      return parseFloat(value) * 41.904;
    },
  },
  action: { type: String },
};
Counter.styles = css`
  :host {
    font-weight: 600;
    font-size: 1.8rem;
  }
`;

customElements.define("cc-counter", Counter);
