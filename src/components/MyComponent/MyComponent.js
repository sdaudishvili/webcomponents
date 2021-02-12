const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: block;
}
</style>
<div>asdf</div>
`;

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.text = this.getAttribute('data-text');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('my-component', MyComponent);

export default MyComponent;
