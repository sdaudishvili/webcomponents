import styles from './Filter.styles.scss';

const style = document.createElement('style');
style.innerHTML = styles;

const template = document.createElement('template');
template.innerHTML = `
<form class="filter">
  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="47" viewBox="0 0 44 47">
    <g fill="none" fill-rule="evenodd">
        <g stroke="#bbbbbb">
            <g transform="translate(-613 -203) translate(613 203)">
                <ellipse cx="19" cy="19.003" rx="18.5" ry="18.488"/>
                <path stroke-linecap="square" d="M31 33.994L42.53 45.516"/>
            </g>
        </g>
    </g>
  </svg>
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
