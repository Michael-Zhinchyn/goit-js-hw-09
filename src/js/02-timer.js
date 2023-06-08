import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
let targetDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate.getTime() < options.defaultDate.getTime()) {
      window.alert('Please choose a date in the future');
    }
  },
};

flatpickr('input#datetime-picker', options);

// Get the elements
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', () => {
  if (targetDate) {
    let countdown = setInterval(() => {
      let currentDateInMs = new Date().getTime();
      let timeDiff = targetDate.getTime() - currentDateInMs;

      if(timeDiff <= 0) {
        clearInterval(countdown);
        console.log('Countdown Finished');
        return;
      } 

      let remainingTime = convertMs(timeDiff);

      // Update the DOM
      daysSpan.textContent = String(remainingTime.days).padStart(2, '0');
      hoursSpan.textContent = String(remainingTime.hours).padStart(2, '0');
      minutesSpan.textContent = String(remainingTime.minutes).padStart(2, '0');
      secondsSpan.textContent = String(remainingTime.seconds).padStart(2, '0');
    },1000);
  }
})

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
