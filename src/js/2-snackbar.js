`use strict`;
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';
document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.target.delay.value);
  const state = event.target.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Promise fulfilled in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Promise rejected in ${delay}ms`,
        position: 'topRight',
      });
    });
});
