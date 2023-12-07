const timer = document.querySelector('.timer');
const days = timer.querySelector('[data-days]');
const hours = timer.querySelector('[data-hours]');
const minutes = timer.querySelector('[data-minutes]');
const seconds = timer.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'iziToast/dist/css/iziToast.min.css';

let userDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
    timerCheck();
  },
};

flatpickr('#datetime-picker', options);
const timerCheck = () => {
  const presentDate = new Date();
  if (presentDate.getTime() < userDate.getTime()) {
    startButton.removeAttribute('disabled');
    startButton.addEventListener('click', timerTry);
  } else {
    iziToast.error({
      title: 'Caution',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
  }
};

function timerTry() {
  // startButton.setAttribute('disabled', 'true');
  const presentDate = new Date();
  const dateDivider = {
    days(timeDifference) {
      return timeDifference / 1000 / 60 / 60 / 24;
    },
    hours(timeDifference) {
      return (this.days(timeDifference) % 1) * 24;
    },
    minutes(timeDifference) {
      return (this.hours(timeDifference) % 1) * 60;
    },
    seconds(timeDifference) {
      return (this.minutes(timeDifference) % 1) * 60;
    },
  };
  const customTime = () => {
    const nowDate = new Date();
    let timeDifference = userDate.getTime() - nowDate.getTime();
    if (timeDifference < 0) {
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      startButton.removeEventListener('click', timerTry);
      startButton.setAttribute('disabled', 'true');
      return;
    }

    days.textContent = `${Math.floor(
      dateDivider.days(timeDifference)
    )}`.padStart(2, '0');

    hours.textContent = `${Math.floor(
      dateDivider.hours(timeDifference)
    )}`.padStart(2, '0');
    minutes.textContent = `${Math.floor(
      dateDivider.minutes(timeDifference)
    )}`.padStart(2, '0');
    seconds.textContent = `${Math.floor(
      dateDivider.seconds(timeDifference)
    )}`.padStart(2, '0');
  };

  const letsGo = setInterval(customTime, 1000);
  const stop = setTimeout(() => {
    clearInterval(letsGo);
    startButton.removeEventListener('click', timerTry);
    startButton.setAttribute('disabled', 'true');
  }, userDate.getTime() - presentDate.getTime());
}
