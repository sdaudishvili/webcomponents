import styles from './Input.styles.scss';

const style = document.createElement('style');
style.innerHTML = styles;

const template = document.createElement('template');
template.innerHTML = `
<div>
  <label></label>
  <input required />
</div>
`;

class Input extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'placeholder', 'title'];
  }

  constructor() {
    super();
    const sr = this.attachShadow({ mode: 'open' });
    sr.appendChild(style.cloneNode(true));
    sr.appendChild(template.content.cloneNode(true));
    this._title = this.getAttribute('title');
    this.$input = sr.querySelector('input');
    this.$title = sr.querySelector('label');
    this.$title.innerText = this._title;

    const name = this.getAttribute('name');
    if (name) {
      this.$input.setAttribute('name', name);
    }

    const placeholder = this.getAttribute('placeholder');
    if (placeholder) {
      this.$input.setAttribute('placeholder', placeholder);
    }

    const type = this.getAttribute('type') || 'text';
    this.$input.setAttribute('type', type);
  }

  connectedCallback() {
    this.$input.addEventListener('input', () => {
      if (this.hasAttribute('errored')) {
        this.removeAttribute('errored');
      }
    });
  }

  get value() {
    return this.$input.value;
  }

  set value(val) {
    this.$input.value = val;
  }

  get type() {
    return this.$input.type;
  }

  set type(val) {
    this._updateAttribute('type', val);
  }

  get placeholder() {
    return this.$input.placeholder;
  }

  set placeholder(val) {
    this._updateAttribute('placeholder', val);
  }

  get name() {
    return this.$input.name;
  }

  set name(val) {
    this._updateAttribute('name', val);
  }

  get title() {
    return this._title;
  }

  set title(val) {
    this._updateTitle(val);
  }

  _updateAttribute(attr, val) {
    this.$input[attr] = val;
    this.setAttribute(attr, val);
  }

  _updateTitle(val) {
    this.setAttribute('title', val);
    this._title = val;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'placeholder') {
        this._updateAttribute('placeholder', newValue);
      }
      if (name === 'type') {
        this._updateAttribute('type', newValue);
      }
      if (name === 'title') {
        this._updateTitle(newValue);
      }
    }
  }
}

customElements.define('my-input', Input);

export default Input;
