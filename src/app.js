import { SinglePayment, Footer, Modal, AddPaymentForm } from '@/components';
import { fetchPayments } from '@/api/payments.api';

const paymentsContainer = document.querySelector('.payments');
const scrollableContainer = document.querySelector('.payments-wrapper');

const footer = document.querySelector('.footer');
const addPaymentBtn = document.querySelector('.tools__add-payment');

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

window.addEventListener('DOMContentLoaded', async () => {
  totalPayments = await fetchPayments();
  scrollableContainer.onscroll = async () => {
    const isAtTheEnd =
      scrollableContainer.scrollTop === scrollableContainer.scrollHeight - scrollableContainer.clientHeight;
    if (isAtTheEnd && scrollableContainer.scrollHeight > scrollableContainer.clientHeight) {
      const res = await fetchPayments();
      totalPayments = [...totalPayments, ...res];
      render();
    }
  };
  render();
});
