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
    const sr = this.attachShadow({ mode: 'open' });
    sr.appendChild(style.cloneNode(true));
    sr.appendChild(template.content.cloneNode(true));
    this.$bg = sr.querySelector('.modal__bg');
  }

  connectedCallback() {
    this.$bg.onclick = this._onBackgroundClick.bind(this);
  }

  _onBackgroundClick() {
    this.dispatchEvent(new CustomEvent('onClose', { detail: {} }));
  }
}

customElements.define('my-modal', Modal);

export default Modal;
