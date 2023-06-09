import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
const alertSound = document.querySelector('#alertSound');
alertSound.volume = 0.3;

const startBtn = document.querySelector('button[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate.getTime() < options.defaultDate.getTime()) {
      alertSound.play();
      Notiflix.Report.warning(
        "Упс ! Обрану дату з'їли динозаври...",
        'Будь ласка, оберіть дату з майбутнього',
        'Гаразд'
      );
      startBtn.classList.remove('valid-date');
      startBtn.classList.add('invalid-date');
    } else {
      startBtn.classList.remove('invalid-date');
      startBtn.classList.add('valid-date');
    }
  },
};

flatpickr('input#datetime-picker', options);


let targetDate = null;
let timer = null;
const interval = 1000


startBtn.addEventListener('click', () => {
  if (targetDate) {
    timer = setInterval(() => {
      let currentDateInMs = new Date().getTime();

      let timeDiff = targetDate.getTime() - currentDateInMs;

      if (timeDiff <= 0) {
        clearInterval(timer);
        return;
      }

      let remainingTime = convertMs(timeDiff);

      // // Оновлюємо DOM
      const timeUnits = {
        days: daysSpan,
        hours: hoursSpan,
        minutes: minutesSpan,
        seconds: secondsSpan,
      };
      
      Object.keys(timeUnits).forEach((unit) => {
        timeUnits[unit].textContent = String(remainingTime[unit]).padStart(2, '0');
      });
    }, interval);
  }
});



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


































// // ------------------------ BUTTON  VISUAL --------------------------
const createSVG = (width, height, radius) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  const rectangle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'rect'
  );

  svg.setAttributeNS(
    'http://www.w3.org/2000/svg',
    'viewBox',
    `0 0 ${width} ${height}`
  );

  rectangle.setAttribute('x', '0');
  rectangle.setAttribute('y', '0');
  rectangle.setAttribute('width', '100%');
  rectangle.setAttribute('height', '100%');
  rectangle.setAttribute('rx', `${radius}`);
  rectangle.setAttribute('ry', `${radius}`);
  rectangle.setAttribute('pathLength', '10');

  svg.appendChild(rectangle);

  return svg;
};

document.querySelectorAll('.sketch-button').forEach(button => {
  const style = getComputedStyle(button);

  const lines = document.createElement('div');

  lines.classList.add('lines');

  const groupTop = document.createElement('div');
  const groupBottom = document.createElement('div');

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

  button.addEventListener('pointerenter', () => {
    button.classList.add('start');
  });

  svg.addEventListener('animationend', () => {
    button.classList.remove('start');
  });
});
