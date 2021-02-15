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
    this.shadowRoot.appendChild(templateHeader.content.cloneNode(true));
    this.shadowRoot.querySelector('div.amount').innerHTML = this._totalAmount;
  }
}

customElements.define('my-footer', Footer);

export default Footer;
