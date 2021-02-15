import axios from '@/utils/axios';

window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.payments');
  axios.get('/api/payments').then((response) => {
    const {
      data: { payments }
    } = response;
    const el = document.createElement('my-payments');
    el.payments = payments;
    container.appendChild(el);
  });
});
