import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


// Знаходимо кнопку старту
const startBtn = document.querySelector('button[data-start]');
// створюємо змінну для запису обраної дати
let targetDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    // Створюємо перевірку. Якщо Вибрана дата вже пройшла, виводимо повідомлення
    if (targetDate.getTime() < options.defaultDate.getTime()) {
      Notiflix.Report.warning('упс... хибна дата',
      'Будь ласка, оберіть дату в майбутньому',
      'Гаразд')
    }
  },
};

flatpickr('input#datetime-picker', options);

// Отримуємо елементи з розмітки
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

// Створюємо обробника події
startBtn.addEventListener('click', () => {
  //Якщо обрана дата валідна, то створюємо інтервал зворотнього відліку
  if (targetDate) {
    //Створюємо інтервал
    let timer = setInterval(() => {
      // Для цього визначаємо теперішню дату
      let currentDateInMs = new Date().getTime();
      // знаходимо в мілісекундах різницю між обраною датою і теперішньою
      let timeDiff = targetDate.getTime() - currentDateInMs;

      // Якщо відлік закінчився, виводимо в консоль 'Timer Finished'
      if(timeDiff <= 0) {
        clearInterval(timer);
        console.log('Timer Finished');
        return;
      } 

      // Присвоюємо змінній залишковий час
      let remainingTime = convertMs(timeDiff);

      // Оновлюємо DOM
      daysSpan.textContent = String(remainingTime.days).padStart(2, '0');
      hoursSpan.textContent = String(remainingTime.hours).padStart(2, '0');
      minutesSpan.textContent = String(remainingTime.minutes).padStart(2, '0');
      secondsSpan.textContent = String(remainingTime.seconds).padStart(2, '0');
    },1000);
  }
})

// функція конвертора мілісекунд в секунди, хвилини, години, дні.
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
