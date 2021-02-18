import { SinglePayment, Footer, Modal, AddPaymentForm } from '@/components';
import { fetchPayments, postPayment } from '@/api/payments.api';
import { debounce } from '@/utils/helpers';

const scrollableContainer = document.querySelector('.payments');
const paymentsContainer = document.querySelector('.payments__container');
const footer = document.querySelector('.payments__footer');

const addPaymentBtn = document.querySelector('.tools__add-payment');
const loader = document.querySelector('.payments__loader');

const totalRecordsNode = document.querySelector('.total-records__count');

const PER_FETCH = 10;

const state = {
  payments: [],
  totalCount: [],
  page: 1,
  q: ''
};

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

const closePopup = () => {
  document.querySelector('my-modal').remove();
};

const render = () => {
  paymentsContainer.innerHTML = '';
  footer.innerHTML = '';
  totalRecordsNode.innerHTML = state.totalCount;
  let sum = 0;
  state.payments.forEach((payment) => {
    sum += Number(payment.amount);
    const newPayment = new SinglePayment(payment);
    newPayment.addEventListener('click', onPaymentClick);
    paymentsContainer.appendChild(newPayment);
  });
  footer.appendChild(new Footer(sum.toFixed(2)));
};

const fetchAndRender = async () => {
  state.page = 1;
  const res = await fetchPayments({ skip: (state.page - 1) * PER_FETCH, take: PER_FETCH, q: state.q });
  state.totalCount = res.totalCount;
  state.payments = res.payments;
  render();
};

const addPayment = async ({ detail: newPayment }) => {
  closePopup();
  await postPayment(newPayment);
  await fetchAndRender();
};

addPaymentBtn.addEventListener('click', async () => {
  const modal = new Modal();
  const paymentForm = new AddPaymentForm();
  modal.appendChild(paymentForm);
  document.body.appendChild(modal);
  modal.addEventListener('onClose', closePopup);
  paymentForm.addEventListener('onClose', closePopup);
  paymentForm.addEventListener('onSubmit', addPayment);
});

document.querySelector('my-filter').addEventListener('filter', async ({ detail: q }) => {
  state.q = q;
  await fetchAndRender();
});

const fetchDebounced = debounce(async () => {
  loader.classList.add('payments__loader--active');
  state.page += 1;
  const res = await fetchPayments({ skip: (state.page - 1) * PER_FETCH, take: PER_FETCH, q: state.q });
  loader.classList.remove('payments__loader--active');
  state.payments = [...state.payments, ...res.payments];
  render();
}, 200);

window.addEventListener('DOMContentLoaded', async () => {
  await fetchAndRender();

  scrollableContainer.onscroll = async () => {
    const startFetching =
      scrollableContainer.scrollTop >= scrollableContainer.scrollHeight - scrollableContainer.clientHeight - 10;
    if (startFetching && scrollableContainer.scrollHeight > scrollableContainer.clientHeight) {
      fetchDebounced();
    }
  };
});
