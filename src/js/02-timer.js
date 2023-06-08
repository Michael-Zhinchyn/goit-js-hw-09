// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    countdown(selectedDates[0]);
  },
};


function countdown(targetDate) {
  let currentDateInMs = options.defaultDate.getTime()
  let targetDateInMs = targetDate.getTime()

  if(targetDateInMs < currentDateInMs) {

    window.alert('Please choose a date in the future');
    return
  }

  let timeDiff = targetDateInMs - currentDateInMs

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  let timerDays = document.querySelector('[data-days]').textContent
  
 
  
  console.log(convertMs(timeDiff)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  

  
  
}





flatpickr('input#datetime-picker', options)






