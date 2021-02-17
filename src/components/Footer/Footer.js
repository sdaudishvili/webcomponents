import styles from './Footer.styles.scss';

const style = document.createElement('style');
style.innerHTML = styles;

const templateHeader = document.createElement('template');
templateHeader.innerHTML = `
<div class="content">
  <div class="content__total">Total</div>
  <div class="content__amount"></div>
</div>
`;

class Footer extends HTMLElement {
  constructor(totalAmount = 0) {
    super();
    this._totalAmount = totalAmount;
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  set totalAmount(val) {
    this._totalAmount = val;
    this._render();
  }

  _render() {
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(templateHeader.content.cloneNode(true));
    this.shadowRoot.querySelector('.content__amount').innerHTML = this._totalAmount;
  }
}

customElements.define('my-footer', Footer);

export default Footer;
