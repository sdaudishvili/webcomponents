import styles from './PlusButton.styles.scss';

const style = document.createElement('style');
style.innerHTML = styles;

const template = document.createElement('template');
template.innerHTML = `
<div class="wrapper"></div>
`;

class PlusButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('plus-button', PlusButton);

export default PlusButton;
