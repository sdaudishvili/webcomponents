import mock from '@/utils/mock';
import categoryTypes from '@/utils/categoryTypes';

export const titles = [
  'Payment Title',
  'Payment Title Longer',
  'Longer Payment Title',
  'Payment Title a bit Longer',
  'Payment Title a bit Longer than previous one',
  'Payment Title much more Longer than the first one',
  'Payment Title much more Longer than the first one and previos',
  'Payment Title much more Longer than the first one and previos prev',
  'Payment Title much more Longer than the first one and previos andprev ',
  'Payment Title much more Longer than the first one and previos andprev and prev'
];

export const comments = [
  'Payment Comment',
  'Payment Comment Longer',
  'Longer Payment Comment',
  'Payment Comment a bit Longer',
  'Payment Comment a bit Longer than previous one',
  'Payment Comment much more Longer than the first one',
  'Payment Comment much more Longer than the first one',
  'Payment Comment much more Longer than the first one',
  'Payment Comment much more Longer than the first one',
  'Payment Comment much more Longer than the first one'
];
const randBetween = (min, max) => Math.floor(Math.random() * max) + min;

const getTitle = () => titles[randBetween(0, titles.length)];
const getCategory = () => categoryTypes[randBetween(0, categoryTypes.length)];
const getDate = () => new Date();
const getComment = () => comments[randBetween(0, comments.length)];
const getAmount = () => randBetween(0, 1000) / 100;

const generateCategory = () => ({
  title: getTitle(),
  category: getCategory(),
  createDate: getDate(),
  comment: getComment(),
  amount: getAmount()
});

const totalPayments = 100;

const payments = Array(totalPayments).fill(undefined).map(generateCategory);
console.log(payments);

mock.onGet('/api/payments').reply(({ q, skip = 0, take = 10 }) => {
  let dataToSend = [...payments];
  if (q) {
    const qToLower = q.toLowerCase();
    dataToSend = dataToSend.filter(
      (x) =>
        x.title.toLowerCase().includes(qToLower) ||
        x.comment.toLowerCase().includes(qToLower) ||
        x.category.toLowerCase().includes(qToLower)
    );
  }
  return [200, { payments: dataToSend.slice(skip, take + skip), totalCount: dataToSend.length }];
});
