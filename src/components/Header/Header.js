const templateHeader = document.createElement('template');
templateHeader.innerHTML = `
<style>
  :host {
    display: block;
  }
</style>
<header class="">
  <div class="container">
    <div>SomeLogo</div>
    <div>hello user</div>
  </div>
</header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
    this.text = this.getAttribute('data-text');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateHeader.content.cloneNode(true));
  }
}

customElements.define('my-header', Header);

export default Header;
