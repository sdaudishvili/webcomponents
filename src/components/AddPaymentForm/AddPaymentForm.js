import validateObject from '@/utils/validateObject';
import styles from './AddPaymentForm.styles.scss';

const style = document.createElement('style');
style.innerHTML = styles;

const template = document.createElement('template');
template.innerHTML = `
<div class="add-payment">
  <div class="add-payment__header">
    <span>ADD NEW PAYMENT</span>
    <span>X</span>
  </div>
  <form class="add-payment__form">
    <my-input class="add-payment__form__title" type="text" title="Title"></my-input>
    <my-input class="add-payment__form__amount" type="text" title="Amount"></my-input>
    <my-input class="add-payment__form__category" type="text" title="Category"></my-input>
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
    sr.appendChild(template.content.cloneNode(true));
    this.$title = sr.querySelector('.add-payment__form__title');
    this.$amount = sr.querySelector('.add-payment__form__amount');
    this.$category = sr.querySelector('.add-payment__form__category');
    this.$date = sr.querySelector('.add-payment__form__date');
    this.$comment = sr.querySelector('.add-payment__form__comment');
    this.$form = sr.querySelector('.add-payment__form');
  }

  connectedCallback() {
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
        this.dispatchEvent(new CustomEvent('onsubmit', { detail: { ...obj } }));
      } catch (error) {
        error.errors.map((x) => this[`$${x}`].setAttribute('errored', ''));
      }
    };
  }
}

customElements.define('add-payment-form', AddPaymentForm);

export default AddPaymentForm;
