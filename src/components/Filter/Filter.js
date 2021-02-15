import styles from './Filter.styles.scss';

const style = document.createElement('style');
style.innerHTML = styles;

const template = document.createElement('template');
template.innerHTML = `
<div>
  <input type="text" placeholder="Filter by any property..." />
  <button>submit</button>
</div>
`;

class Filter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const button = this.shadowRoot.querySelector('button');
    const input = this.shadowRoot.querySelector('input');
    button.onclick = () => {
      this.dispatchEvent(new CustomEvent('filter', { detail: input.value }));
    };
  }
}

customElements.define('my-filter', Filter);

export default Filter;
