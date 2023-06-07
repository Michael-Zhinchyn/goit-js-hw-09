const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

let commonStyles = {
  width: '200px',
  height: '100px',
  borderRadius: '10px',
  borderColor: 'transparent',
  fontSize: '30px',
};

Object.assign(toggleSwitch.style, commonStyles);

let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    // Цей код виконається, коли чекбокс відмічено
    // Тут виконується код, який був у "кліку" на кнопці 1
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      toggleSwitch.style.backgroundColor = getRandomHexColor();
    }, 1000);
  } else {
    // Цей код виконається, коли чекбокс не відмічено
    // Тут виконується код, який був у "кліку" на кнопці 2
    toggleSwitch.style.backgroundColor = getRandomHexColor();
    clearInterval(timerId);
  }
});
