import mock from '@/utils/mock';
import categoryTypes from '@/utils/categoryTypes';

const getRandomCategory = () => categoryTypes[Math.floor(Math.random() * categoryTypes.length)];

const payments = [
  {
    id: '1',
    title: 'Payment Title',
    category: getRandomCategory(),
    createDate: new Date(),
    comment: 'Payment Comment',
    amount: '21.80'
  },
  {
    id: '2',
    title: 'Payment Title Longer',
    category: getRandomCategory(),
    createDate: new Date(),
    comment: 'Payment Comment Longer',
    amount: '21.80'
  },
  {
    id: '3',
    title: 'Longer Payment Title',
    category: getRandomCategory(),
    createDate: new Date(),
    comment: 'Longer Payment Comment',
    amount: '21.80'
  },
  {
    id: '4',
    title: 'Payment Title a bit Longer',
    category: getRandomCategory(),
    createDate: new Date(),
    comment: 'Payment Comment a bit Longer',
    amount: '21.80'
  },
  {
    id: '5',
    title: 'Payment Title a bit Longer than previous one',
    category: getRandomCategory(),
    createDate: new Date(),
    comment: 'Payment Comment a bit Longer than previous one',
    amount: '21.80'
  },
  {
    id: '6',
    title: 'Payment Title much more Longer than the first one',
    category: getRandomCategory(),
    createDate: new Date(),
    comment: 'Payment Comment much more Longer than the first one',
    amount: '21.80'
  },
  {
    id: '7',
    title: 'Payment Title much more Longer than the first one',
    category: getRandomCategory(),
    createDate: new Date(),
    comment: 'Payment Comment much more Longer than the first one',
    amount: '21.80'
  }
];

mock.onGet('/api/payments').reply(200, {
  payments
});
