import styles from './DropDown.styles.scss';

const style = document.createElement('style');
style.innerHTML = styles;

const template = document.createElement('template');
template.innerHTML = `
<div>
  <label></label>
  <select>
    <option value="">Select category</option>
  </select>
</div>
`;

class DropDown extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'title'];
  }

  constructor() {
    super();
    const sr = this.attachShadow({ mode: 'open' });
    sr.appendChild(style.cloneNode(true));
    sr.appendChild(template.content.cloneNode(true));
    this._title = this.getAttribute('title');
    this.$select = sr.querySelector('select');
    this.$title = sr.querySelector('label');
    this.$title.innerText = this._title;

    const name = this.getAttribute('name');
    if (name) {
      this.$select.setAttribute('name', name);
    }

    this._items = [];
  }

  connectedCallback() {
    this.$select.addEventListener('input', this._onInputChange.bind(this));
  }

  disconnectedCallback() {
    this.$select.removeEventListener('input', this._onInputChange.bind(this));
  }

  _render() {
    this._items.forEach((option) => {
      const el = document.createElement('option');
      el.value = option;
      el.innerText = option;
      this.$select.appendChild(el);
    });
  }

  _onInputChange() {
    if (this.hasAttribute('errored')) {
      this.removeAttribute('errored');
    }
  }

  get items() {
    return this._items;
  }

  set items(val) {
    this._items = val;
    this._render();
  }

  get value() {
    return this.$select.value;
  }

  set value(val) {
    this.$select.value = val;
  }

  get name() {
    return this.$select.name;
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
    this.$select[attr] = val;
    this.setAttribute(attr, val);
  }

  _updateTitle(val) {
    this.setAttribute('title', val);
    this._title = val;
    this.$title.innerText = this._title;
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

customElements.define('drop-down', DropDown);

export default DropDown;
