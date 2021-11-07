import { LitElement, css, html } from "lit";

// =================================
// Dinerojs version that not working
// Blocked by TypeError: a.cmp is not a function
// Maybe https://github.com/dinerojs/dinero.js/issues/58 should help
// =================================
// import { createDinero, multiply, toSnapshot } from "dinero.js";
// import { EUR } from "@dinero.js/currencies";
// import { Big } from "big.js";
// import { calculator } from "@dinero.js/calculator-bigint";
// const bigDinero = createDinero({ calculator });
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
      // const multipler = bigDinero({ amount: 41.904, currency: EUR });
      // const price = bigDinero({ amount: parseFloat(value), currency: EUR });
      // return toSnapshot(multiply(price, multipler)).amount;
      return parseFloat(value) * 41.904
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
