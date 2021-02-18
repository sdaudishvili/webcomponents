/* eslint-disable no-undef */
import dayjs from 'dayjs';
import styles from './SinglePayment.styles.scss';

const style = document.createElement('style');
style.textContent = styles;

class SinglePayment extends HTMLElement {
  static get observedAttributes() {
    return ['expanded'];
  }

  constructor(payment = {}) {
    super();
    this._payment = payment;
    this.attachShadow({ mode: 'open' });
  }

  set payment(value) {
    this._payment = value;
  }

  connectedCallback() {
    this._render();
    this.$comment = this.shadowRoot.querySelector('.payment__comment');
  }

  get expanded() {
    return this.hasAttribute('expanded');
  }

  set expanded(val) {
    if (val === true) {
      this.setAttribute('expanded', '');
    } else {
      this.removeAttribute('expanded');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'expanded') {
        if (newValue || newValue === '') {
          this.setAttribute('expanded', '');
          gsap.to(this.$comment, { height: 'auto' });
        } else {
          this.removeAttribute('expanded');
          gsap.to(this.$comment, { height: '0' });
        }
      }
    }
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
          <div class="payment__price__amount">${Number(this._payment.amount).toFixed(2)}</div>
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
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(elemTemaplate.content.cloneNode(true));
  }
}

customElements.define('single-payment', SinglePayment);

export default SinglePayment;
