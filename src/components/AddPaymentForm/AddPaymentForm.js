import { validateObject } from '@/utils/helpers';
import categoryTypes from '@/utils/categoryTypes';
import styles from './AddPaymentForm.styles.scss';
import '@/components/DropDown';

const style = document.createElement('style');
style.innerHTML = styles;

const template = document.createElement('template');
template.innerHTML = `
<div class="add-payment">
  <div class="add-payment__header">
    <span>ADD NEW PAYMENT</span>
    <span class="add-payment__header__close">X</span>
  </div>
  <form class="add-payment__form">
    <my-input class="add-payment__form__title" type="text" title="Title"></my-input>
    <my-input class="add-payment__form__amount" type="number" title="Amount"></my-input>
    <drop-down class="add-payment__form__category" title="Category"></drop-down>
    <my-input class="add-payment__form__date" type="date" title="Date"></my-input>
    <my-input class="add-payment__form__comment" type="text" title="Comment"></my-input>
    <button  class="add-payment__form__submit"type="submit">CREATE</button>
  </form>
</div>
`;

class AddPaymentForm extends HTMLElement {
  constructor() {
    super();
    const sr = this.attachShadow({ mode: 'open' });
    sr.appendChild(style.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$category = this.shadowRoot.querySelector('.add-payment__form__category');
    this.$title = this.shadowRoot.querySelector('.add-payment__form__title');
    this.$amount = this.shadowRoot.querySelector('.add-payment__form__amount');
    this.$date = this.shadowRoot.querySelector('.add-payment__form__date');
    this.$comment = this.shadowRoot.querySelector('.add-payment__form__comment');
    this.$form = this.shadowRoot.querySelector('.add-payment__form');
    this.$closeBtn = this.shadowRoot.querySelector('.add-payment__header__close');

    this.$category.items = categoryTypes;

    this.$form.onsubmit = (e) => {
      e.preventDefault();
      const obj = {
        title: this.$title.value,
        amount: this.$amount.value,
        category: this.$category.value,
        date: this.$date.value,
        comment: this.$comment.value
      };
      try {
        validateObject(obj);
        this.dispatchEvent(new CustomEvent('onSubmit', { detail: { ...obj } }));
      } catch (error) {
        error.errors.map((x) => this[`$${x}`].setAttribute('errored', ''));
      }
    };
    this.$closeBtn.onclick = () => {
      this.dispatchEvent(new CustomEvent('onClose', { detail: {} }));
    };
  }
}

customElements.define('add-payment-form', AddPaymentForm);

export default AddPaymentForm;
