import _ from 'lodash';

const btn = document.querySelector('.btn');
const count = document.querySelector('.count');

btn.addEventListener('click', () => {
  const currCount = Number(count.textContent);
  count.textContent = currCount + 1;
});
