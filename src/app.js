/* eslint-disable no-unused-vars */
import { SinglePayment, Footer, Modal, AddPaymentForm } from '@/components';
import { fetchPayments } from '@/api/payments.api';
import { debounce } from '@/utils/helpers';

const paymentsContainer = document.querySelector('.payments');
const scrollableContainer = document.querySelector('.payments-wrapper');

const footer = document.querySelector('.footer');
const addPaymentBtn = document.querySelector('.tools__add-payment');
const loader = document.querySelector('.loader');

let totalPayments = [];

const render = () => {
  paymentsContainer.innerHTML = '';
  footer.innerHTML = '';
  let sum = 0;
  totalPayments.forEach((payment) => {
    sum += Number(payment.amount);
    paymentsContainer.appendChild(new SinglePayment(payment));
  });
  footer.appendChild(new Footer(sum.toFixed(2)));
};

const onFilter = async ({ detail: q }) => {
  totalPayments = await fetchPayments({ q });
  render();
};

const closePopup = () => {
  document.querySelector('my-modal').remove();
};

const addPayment = ({ detail: newPayment }) => {
  closePopup();
  totalPayments = [newPayment, ...totalPayments];
  render();
};

addPaymentBtn.addEventListener('click', () => {
  const modal = new Modal();
  const paymentForm = new AddPaymentForm();
  modal.appendChild(paymentForm);
  document.body.appendChild(modal);
  modal.addEventListener('onClose', closePopup);
  paymentForm.addEventListener('onClose', closePopup);
  paymentForm.addEventListener('onSubmit', addPayment);
});

document.querySelector('my-filter').addEventListener('filter', onFilter);

const fetchDebounced = debounce(async () => {
  loader.classList.add('loader--active');
  const res = await fetchPayments();
  loader.classList.remove('loader--active');
  totalPayments = [...totalPayments, ...res];
  render();
}, 200);

window.addEventListener('DOMContentLoaded', async () => {
  totalPayments = await fetchPayments();
  render();

  scrollableContainer.onscroll = async () => {
    const startFetching =
      scrollableContainer.scrollTop >= scrollableContainer.scrollHeight - scrollableContainer.clientHeight - 10;
    if (startFetching && scrollableContainer.scrollHeight > scrollableContainer.clientHeight) {
      fetchDebounced();
    }
  };
});
