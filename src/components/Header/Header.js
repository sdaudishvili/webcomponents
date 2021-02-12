const templateHeader = document.createElement('template');
templateHeader.innerHTML = `
<style>
  :host {
    display: block;
  }
</style>
<header style="box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.13);" class="bg-white-100">
  <div class="container h-5-6 flex items-center justify-between ">
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
