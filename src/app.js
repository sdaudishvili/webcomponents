import axios from '@/utils/axios';
import { SinglePayment, Footer } from '@/components';

const paymentsContainer = document.querySelector('.payments');
const footer = document.querySelector('.footer');
const addPaymentBtn = document.querySelector('.tools__add-payment');

addPaymentBtn.addEventListener('click', (e) => {
  console.log(e);
});

const fetchData = (cb, query) => {
  axios.get('/api/payments', query).then((response) => {
    const {
      data: { payments }
    } = response;
    cb(payments);
  });
};

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

const onFilter = ({ detail: q }) => {
  fetchData(render, { q });
};

document.querySelector('my-filter').addEventListener('filter', onFilter);

window.addEventListener('DOMContentLoaded', () => {
  fetchData(render);
});
