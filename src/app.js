import { SinglePayment, Footer, Modal, AddPaymentForm } from '@/components';
import { fetchPayments } from '@/api/payments.api';

const paymentsContainer = document.querySelector('.payments');
const footer = document.querySelector('.footer');
const addPaymentBtn = document.querySelector('.tools__add-payment');

const closePopup = () => {
  document.querySelector('my-modal').remove();
};

const addPayment = ({ detail: newPayment }) => {
  console.log(newPayment);
  closePopup();
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

const render = (payments) => {
  let sum = 0;
  paymentsContainer.innerHTML = '';
  footer.innerHTML = '';

  payments.forEach((payment) => {
    sum += payment.amount;
    paymentsContainer.appendChild(new SinglePayment(payment));
  });
  footer.appendChild(new Footer(sum.toFixed(2)));
};

const onFilter = async ({ detail: q }) => {
  const payments = await fetchPayments({ q });
  render(payments);
};

document.querySelector('my-filter').addEventListener('filter', onFilter);

window.addEventListener('DOMContentLoaded', async () => {
  const payments = await fetchPayments();
  render(payments);
});
