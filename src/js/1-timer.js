`use strict`;

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('#start-btn');
const dateTimePicker = document.querySelector('#datetime-picker');

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
  }

  init() {
    const time = { days: '00', hours: '00', minutes: '00', seconds: '00' };
    this.onTick(time);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    dateTimePicker.disabled = false; // Активуємо інпут
    const time = { days: '00', hours: '00', minutes: '00', seconds: '00' };
    this.onTick(time);
  }

  start() {
    if (this.isActive) return;

    this.isActive = true;
    startBtn.disabled = true;
    dateTimePicker.disabled = true; // Деактивуємо інпут під час відліку
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

    const days = Math.floor(ms / day)
      .toString()
      .padStart(2, '0');
    const hours = Math.floor((ms % day) / hour)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor(((ms % day) % hour) / minute)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((((ms % day) % hour) % minute) / second)
      .toString()
      .padStart(2, '0');

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
