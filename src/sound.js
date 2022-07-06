const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

function playSound(sound) {
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}

export function playCarrot() {
  playSound(carrotSound);
}
export function playAlert() {
  playSound(alertSound);
}
export function playBackgound() {
  playSound(bgSound);
}
export function playBug() {
  playSound(bugSound);
}
export function playWin() {
  playSound(winSound);
}
export function stopBackground() {
  stopSound(bgSound);
}
