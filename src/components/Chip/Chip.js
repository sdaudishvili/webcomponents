const style = document.createElement('style');
style.innerHTML = `
:host {
  height: 2.4rem;
  padding: 0 1.3rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  border-radius: 1.2rem;
  border: 1px solid var(--blue-400);
  transition: 0.2s;
  cursor: pointer;
}
:host(:hover) {
  background: var(--blue-400);
}
`;

const template = document.createElement('template');
template.innerHTML = `
<slot></slot>
`;

class Chip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-chip', Chip);

export default Chip;
