import { SinglePayment } from './components';

const styles = document.createElement('style');
styles.innerHTML = `
:host {
  display: block;
}
`;

class Payments extends HTMLElement {
  constructor() {
    super();
    this._payments = '';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(styles.cloneNode(true));
  }

  set payments(value) {
    this._payments = value;
  }

  connectedCallback() {
    this._payments.forEach((payment) => {
      const singlePayment = new SinglePayment(payment);
      this.shadowRoot.appendChild(singlePayment);
    });
  }
}

customElements.define('my-payments', Payments);

export default Payments;
