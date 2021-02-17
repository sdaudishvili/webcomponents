/* eslint-disable import/prefer-default-export */
import axios from '@/utils/axios';

export const fetchPayments = async (options) => {
  try {
    const {
      data: { payments }
    } = await axios.get('/api/payments', options);
    return payments;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
