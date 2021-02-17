import styles from './Header.styles.scss';

const style = document.createElement('style');
style.innerHTML = styles;

const templateHeader = document.createElement('template');
templateHeader.innerHTML = `
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
    this.appendChild(style.cloneNode(true));
    this.appendChild(templateHeader.content.cloneNode(true));
  }
}

customElements.define('my-header', Header);

export default Header;
