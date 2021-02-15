const templateHeader = document.createElement('template');
templateHeader.innerHTML = `
<style lang="scss">
:host {
  display: block;
  padding: 1.6rem 1.3rem 1.6rem 2.5rem;
  color: white;
  background-color: var(--blue-400);
}
div {
  width: max-content;
  margin-left: auto;
  font-size: 1.4rem;
}
div.amount {
  font-size: 2.8rem;
}
</style>
<footer>
  <div>Total</div>
  <div class="amount"></div>
</footer>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
    this._totalAmount = '83.60';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateHeader.content.cloneNode(true));
    this.shadowRoot.querySelector('div.amount').innerHTML = this._totalAmount;
  }

  set totalAmount(val) {
    this._totalAmount = val;
  }
}

customElements.define('my-footer', Footer);

export default Footer;
