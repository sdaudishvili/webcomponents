import styles from './Modal.styles.scss';

const style = document.createElement('style');
style.innerHTML = styles;

const template = document.createElement('template');
template.innerHTML = `
<div class="modal">
  <div class="modal__bg"></div>
  <div class="modal__body">
    <slot></slot>
  </div>
</div>
`;

class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-modal', Modal);

export default Modal;
