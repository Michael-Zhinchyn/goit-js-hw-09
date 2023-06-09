import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const alertSound = document.querySelector('#alertSound')
alertSound.volume = 0.3


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
      alertSound.play()
      Notiflix.Report.warning('упс! обрану дату з\'їли динозаври',
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




















// ------------------------ BUTTON --------------------------
const createSVG = (width, height, radius) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  const rectangle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );

  svg.setAttributeNS(
    "http://www.w3.org/2000/svg",
    "viewBox",
    `0 0 ${width} ${height}`
  );

  rectangle.setAttribute("x", "0");
  rectangle.setAttribute("y", "0");
  rectangle.setAttribute("width", "100%");
  rectangle.setAttribute("height", "100%");
  rectangle.setAttribute("rx", `${radius}`);
  rectangle.setAttribute("ry", `${radius}`);
  rectangle.setAttribute("pathLength", "10");

  svg.appendChild(rectangle);

  return svg;
};

document.querySelectorAll(".sketch-button").forEach((button) => {
  const style = getComputedStyle(button);

  const lines = document.createElement("div");

  lines.classList.add("lines");

  const groupTop = document.createElement("div");
  const groupBottom = document.createElement("div");

  const svg = createSVG(
    button.offsetWidth,
    button.offsetHeight,
    parseInt(style.borderRadius, 10)
  );

  groupTop.appendChild(svg);
  groupTop.appendChild(svg.cloneNode(true));
  groupTop.appendChild(svg.cloneNode(true));
  groupTop.appendChild(svg.cloneNode(true));

  groupBottom.appendChild(svg.cloneNode(true));
  groupBottom.appendChild(svg.cloneNode(true));
  groupBottom.appendChild(svg.cloneNode(true));
  groupBottom.appendChild(svg.cloneNode(true));

  lines.appendChild(groupTop);
  lines.appendChild(groupBottom);

  button.appendChild(lines);

  button.addEventListener("pointerenter", () => {
    button.classList.add("start");
  });

  svg.addEventListener("animationend", () => {
    button.classList.remove("start");
  });
});
