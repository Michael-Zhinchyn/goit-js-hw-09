const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    // Цей код виконається, коли чекбокс відмічено або по який був при "кліку" на кнопці START

    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      toggleSwitch.style.backgroundColor = getRandomHexColor();
    }, 1000);
  } else {
    // Цей код виконається, коли чекбокс відмічено або по який був при "кліку" на кнопці STOP
    toggleSwitch.style.backgroundColor = getRandomHexColor();
    clearInterval(timerId);
  }
});

//
//
//
//

// Початковий код для кнопок
//

// const startBtn = document.querySelector('button[data-start]');
// const stopBtn = document.querySelector('button[data-stop]');

// let commonStyles = {
//   width: '200px',
//   height: '100px',
//   borderRadius: '10px',
//   borderColor: 'transparrent',
//   fontSize: '30px',
// };

// Object.assign(startBtn.style, commonStyles);
// Object.assign(stopBtn.style, commonStyles);

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215)
//     .toString(16)
//     .padStart(6, 0)}`;
// }

// startBtn.addEventListener('click', () => {
//   startBtn.disabled = true;
//   stopBtn.disabled = false;
//   timerId = setInterval(() => {
//     document.body.style.backgroundColor = getRandomHexColor();
//     stopBtn.style.backgroundColor = getRandomHexColor();
//   }, 1000);
// });

// stopBtn.addEventListener('click', () => {
//   startBtn.disabled = false;
//   stopBtn.disabled = true;
//   startBtn.style.backgroundColor = getRandomHexColor();
//   clearInterval(timerId);
// });
