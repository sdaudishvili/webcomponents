import { SinglePayment, Footer, Modal, AddPaymentForm } from '@/components';
import { fetchPayments } from '@/api/payments.api';
import { debounce } from '@/utils/helpers';

const scrollableContainer = document.querySelector('.payments');
const paymentsContainer = document.querySelector('.payments__container');
const footer = document.querySelector('.payments__footer');

const addPaymentBtn = document.querySelector('.tools__add-payment');
const loader = document.querySelector('.payments__loader');

const totalRecordsNode = document.querySelector('.total-records__count');

let totalPayments = [];

const onPaymentClick = (e) => {
  if (e.target.expanded) {
    e.target.expanded = false;
  } else {
    const openedElem = paymentsContainer.querySelector('[expanded]');
    if (openedElem) {
      openedElem.expanded = false;
    }
    e.target.expanded = true;
  }
};

const render = () => {
  paymentsContainer.innerHTML = '';
  footer.innerHTML = '';
  totalRecordsNode.innerHTML = totalPayments.length;
  let sum = 0;
  totalPayments.forEach((payment) => {
    sum += Number(payment.amount);
    const newPayment = new SinglePayment(payment);
    newPayment.addEventListener('click', onPaymentClick);
    paymentsContainer.appendChild(newPayment);
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
  loader.classList.add('payments__loader--active');
  const res = await fetchPayments();
  loader.classList.remove('payments__loader--active');
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
