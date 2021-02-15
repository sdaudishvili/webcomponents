import dayjs from 'dayjs';
// eslint-disable-next-line import/no-webpack-loader-syntax
import css from './SinglePayment.styles.scss';

console.log(css);

const styles = document.createElement('style');
styles.innerHTML = css;

class SinglePayment extends HTMLElement {
  constructor(payment = {}) {
    super();
    this._payment = payment;
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['expanded'];
  }

  set payment(value) {
    this._payment = value;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    JSON.stringify(this);
    console.log('name', name);
    console.log('oldValue', oldValue);
    console.log('newValue', newValue);
  }

  connectedCallback() {
    this._render();
    this.addEventListener('click', this._onClick);
    this._paymentRef = this.shadowRoot.querySelector('.payment');
    if (this.getAttribute('expanded') !== 'true') {
      this._hide();
    }
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }

  _onClick() {
    const nextStatus = this.getAttribute('expanded') !== 'true';
    if (nextStatus) {
      this._show();
    } else {
      this._hide();
    }
    this.setAttribute('expanded', nextStatus);
  }

  _show() {
    this._paymentRef.classList.add('payment--expanded');
  }

  _hide() {
    this._paymentRef.classList.remove('payment--expanded');
  }

  _render() {
    const elemTemaplate = document.createElement('template');
    elemTemaplate.innerHTML = `
    <div class="payment">
      <div class="row">
        <div class="payment__title">${this._payment.title}</div>
        <div class="payment__date">${`on ${dayjs(this._payment.createDate).format('dddd, DD MMMM YYYY')}`}</div>
      </div>
      <div class="row">
        <div class="payment__category">
          <my-chip>${this._payment.category}</my-chip>
        </div>
        <div class="payment__price">
          <div class="payment__price__amount">${this._payment.amount}</div>
          <div class="payment__price__currency">GEL</div>
        </div>
      </div>
      <div class="payment__comment">
        <div class="payment__comment__area">
          comment:
          <div class="payment__comment__area__text">${this._payment.comment}</div>
        </div>
      </div>
    </div>`;
    this.shadowRoot.appendChild(styles.cloneNode(true));
    this.shadowRoot.appendChild(elemTemaplate.content.cloneNode(true));
  }
}

customElements.define('single-payment', SinglePayment);

export default SinglePayment;
