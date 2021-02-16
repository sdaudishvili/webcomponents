import styles from './Filter.styles.scss';
import inlineSvg from '../../../public/svg/search.icon.svg';

const style = document.createElement('style');
style.innerHTML = styles;

const template = document.createElement('template');
template.innerHTML = `
<form class="filter">
  ${inlineSvg}
  <input class="filter__input" type="text" placeholder="Filter by any property..." />
  <vertical-divider></vertical-divider>
  <button class="filter__button" type="submit">Filter</button>
</form>
`;

class Filter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const input = this.shadowRoot.querySelector('input');
    const form = this.shadowRoot.querySelector('form');
    form.onsubmit = (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('filter', { detail: input.value }));
    };
  }
}

customElements.define('my-filter', Filter);

export default Filter;
