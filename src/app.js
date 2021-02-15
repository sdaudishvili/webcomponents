import axios from '@/utils/axios';
import { SinglePayment, Footer } from '@/components';

const paymentsContainer = document.querySelector('.payments');
const footer = document.querySelector('.footer');

window.addEventListener('DOMContentLoaded', () => {
  axios.get('/api/payments').then((response) => {
    const {
      data: { payments }
    } = response;
    let sum = 0;
    payments.forEach((payment) => {
      sum += payment.amount;
      paymentsContainer.appendChild(new SinglePayment(payment));
    });
    footer.appendChild(new Footer(sum.toFixed(2)));
  });
});
