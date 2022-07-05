const stateBtn = document.querySelector('.state-btn');
const remainTime = document.querySelector('.timer');
const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();

const replay = document.querySelector('.replay-wrap');
const carrotCnt = document.querySelector('.carrot-cnt');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
let timerRender = '';
let catchCarrotCnt = 10;
const CARROT_SIZE = 80;

stateBtn.addEventListener('click', () => {
  playGame();
});

document.querySelector('.field').addEventListener('click', (e) => {
  if (!stateBtn.classList.contains('play')) {
    return;
  }

  if (e.target.classList.contains('carrot')) {
    e.target.remove();
    carrotCatch();
    playSound(carrotSound);
  } else if (e.target.classList.contains('bug')) {
    replayRender('YOU LOST');
    playSound(winSound);
  }
});

function timer(time) {
  let setTime = parseInt(time);
  let min = '';
  let sec = '';
  timerRender = setInterval(() => {
    min = Math.floor(setTime / 60);
    sec = setTime % 60;

    remainTime.textContent = `${min} : ${sec}`;
    setTime--;

    if (setTime < 0) {
      clearInterval(timerRender);
      replayRender('YOU LOST');
      playSound(alertSound);
    }
  }, 1000);
}

function replayRender(message) {
  clearInterval(timerRender);
  stateBtn.classList.remove('play');
  stateBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;

  replay.innerHTML = `
        <div class="replay">
            <button class="replay-btn">
            <i class="fa-solid fa-rotate-right"></i>
            </button>
            <p>${message}</p>
        </div>
    `;

  const replayBtn = document.querySelector('.replay-btn');
  replayBtn.addEventListener('click', () => {
    playGame();
  });
}

function playGame() {
  if (stateBtn.classList.toggle('play')) {
    stateBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
    timer(10);
    replay.innerHTML = '';
    catchCarrotCnt = 10;
    carrotCnt.textContent = catchCarrotCnt;
    fieldRender();
  } else {
    stateBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    replayRender('REPLAY?');
    playSound(alertSound);
  }
}

function fieldRender() {
  field.innerHTML = '';

  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < 10; i++) {
    const carrot = document.createElement('img');
    carrot.setAttribute('class', 'carrot');
    carrot.setAttribute('src', './img/carrot.png');
    carrot.style.position = 'absolute';

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    carrot.style.left = `${x}px`;
    carrot.style.top = `${y}px`;
    field.append(carrot);
  }
  for (let j = 0; j < 8; j++) {
    const bug = document.createElement('img');
    bug.setAttribute('class', 'bug');
    bug.setAttribute('src', './img/bug.png');
    bug.style.position = 'absolute';

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    bug.style.left = `${x}px`;
    bug.style.top = `${y}px`;
    field.append(bug);
  }
}
function randomNumber(max, min) {
  return Math.random() * (max - min) + min;
}
function carrotCatch() {
  catchCarrotCnt--;
  carrotCnt.textContent = catchCarrotCnt;
  if (catchCarrotCnt == 0) {
    replayRender('YOU WON');
    playSound(winSound);
  }
}
function playSound(sound) {
  sound.play();
}
