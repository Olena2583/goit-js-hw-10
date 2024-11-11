`use strict`;

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// const startBtn = document.querySelector('#start-btn');

// let selectedDate = null;
// startBtn.disabled = true;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     selectedDate = selectedDates[0];
//     const now = new Date();
//     if (selectedDate <= now) {
//       startBtn.disabled = true;
//       iziToast.show({
//         title: 'Error',
//         message: 'Please choose a date in the future',
//         color: 'red',
//         position: 'topCenter',
//       });
//     } else {
//       startBtn.disabled = false;
//     }
//   },
// };

// flatpickr('#datetime-picker', options);

// class Timer {
//   constructor({ onTick }) {
//     this.isActive = false;
//     this.onTick = onTick;
//     this.intervalId = null;
//     this.init();
//   }
//   init() {
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }
//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }
//   start() {
//     if (this.isActive) return;

//     this.isActive = true;
//     startBtn.disabled = true;
//     const endTime = selectedDate.getTime();
//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = endTime - currentTime;
//       if (deltaTime <= 0) {
//         this.stop();
//         iziToast.show({
//           title: 'Completed',
//           message: 'Timer has ended',
//           color: 'green',
//           position: 'topCenter',
//         });
//         return;
//       }
//       const time = this.convertMs(deltaTime);

//       this.onTick(time);
//     }, 1000);
//   }

//   getTimeComponents(time) {
//     const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
//     const hours = this.pad(
//       Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//     );
//     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

//     return { hours, mins, secs };
//   }

//   pad(value) {
//     return String(value).padStart(2, '0');
//   }

//   convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const days = Math.floor(ms / day);
//     const hours = Math.floor((ms % day) / hour);
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
//   }
// }

// const timer = new Timer({
//   onTick: updateClockface,
// });

// function updateClockface({ days, hours, minutes, seconds }) {
//   document.querySelector('[data-days]').textContent = days;
//   document.querySelector('[data-hours]').textContent = hours;
//   document.querySelector('[data-minutes]').textContent = minutes;
//   document.querySelector('[data-seconds]').textContent = seconds;
// }

// startBtn.addEventListener('click', () => {
//   timer.start();
// });

// async function loadHTML(selector, url) {
//   const response = await fetch(url);
//   if (response.ok) {
//     const text = await response.text();
//     document.querySelector(selector).innerHTML = text;
//   }
// }
const startBtn = document.querySelector('#start-btn');

let selectedDate = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate <= now) {
      startBtn.disabled = true;
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topCenter',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.isActive = false;
    this.onTick = onTick;
    this.intervalId = null;
    this.init;
  }
  init() {
    const time = { days: '00', hours: '00', minutes: '00', seconds: '00' };
    this.onTick(time);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = { days: '00', hours: '00', minutes: '00', seconds: '00' };
    this.onTick(time);
  }
  start() {
    if (this.isActive) return;

    this.isActive = true;
    startBtn.disabled = true;
    const endTime = selectedDate.getTime();
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = endTime - currentTime;

      if (deltaTime <= 0) {
        this.stop();
        iziToast.show({
          title: 'Completed',
          message: 'Timer has ended',
          color: 'green',
          position: 'topCenter',
        });
        return;
      }
      const time = this.convertMs(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days =
      Math.floor(ms / day) <= 9
        ? '0' + Math.floor(ms / day)
        : Math.floor(ms / day);
    const hours =
      Math.floor((ms % day) / hour) <= 9
        ? '0' + Math.floor((ms % day) / hour)
        : Math.floor((ms % day) / hour);
    const minutes =
      Math.floor(((ms % day) % hour) / minute) <= 9
        ? '0' + Math.floor(((ms % day) % hour) / minute)
        : Math.floor(((ms % day) % hour) / minute);
    const seconds =
      Math.floor((((ms % day) % hour) % minute) / second) <= 9
        ? '0' + Math.floor((((ms % day) % hour) % minute) / second)
        : Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onTick: ({ days, hours, minutes, seconds }) => {
    document.querySelector('[data-days]').textContent = days;
    document.querySelector('[data-hours]').textContent = hours;
    document.querySelector('[data-minutes]').textContent = minutes;
    document.querySelector('[data-seconds]').textContent = seconds;
  },
});

startBtn.addEventListener('click', () => {
  timer.start();
});

async function loadHTML(selector, url) {
  const response = await fetch(url);
  if (response.ok) {
    const text = await response.text();
    document.querySelector(selector).innerHTML = text;
  }
}
