const templateHeader = document.createElement('template');
templateHeader.innerHTML = `
<style lang="scss">
  :host {
    display: block;
  }
  .header {
    background: var(--white-100);
    height: var(--header-size);
  }
  .header__content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<header class="header">
  <div class="header__content container">
    <div>SomeLogo</div>
    <div>hello user</div>
  </div>
</header>
`;

class Header extends HTMLElement {
  constructor() {
    super();
    this.appendChild(templateHeader.content.cloneNode(true));
  }
}

customElements.define('my-header', Header);

export default Header;
