/* eslint-disable import/prefer-default-export */
import axios from '@/utils/axios';

export const fetchPayments = async (options) => {
  try {
    const { data } = await axios.get('/api/payments', options);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postPayment = async (payment) => {
  try {
    await axios.post('/api/payments', payment);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
