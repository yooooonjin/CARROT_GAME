'use strict';

import * as sound from './sound.js';

const Reason = Object.freeze({
  win: 'YOU WON',
  lose: 'YOU LOST',
  cancel: 'REPLAY?',
});

export default class GameBuilder {
  withGameTime(time) {
    this.gameTime = time;
    return this;
  }
  withCatchCarrotCnt(num) {
    this.catchCarrotCnt = num;
    return this;
  }

  build() {
    return new Game(
      this.gameTime, //
      this.catchCarrotCnt
    );
  }
}

class Game {
  constructor(time, catchCarrotCnt) {
    this.time = time;
    this._catchCarrotCnt = catchCarrotCnt;
    this.catchCarrotCnt = catchCarrotCnt;
    this.timerRender = '';
    this.stateBtn = document.querySelector('.state-btn');
    this.stateBtn.addEventListener('click', () => {
      if (this.stateBtn.classList.toggle('play')) {
        this.playGame();
      } else {
        this.stopGame();
        this.stopPopup(Reason.cancel);
      }
    });
    this.remainTime = document.querySelector('.timer');
    this.carrotCnt = document.querySelector('.carrot-cnt');
  }

  setGameState(play, stop) {
    this.play = play;
    this.stop = stop;
  }

  playGame() {
    this.play && this.play();
    this.timer();
    this.stateBtn.classList.add('play');
    this.stateBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
    this.carrotCnt.textContent = this._catchCarrotCnt;
    this.catchCarrotCnt = this._catchCarrotCnt;
    sound.playBackgound();
  }
  stopGame() {
    clearInterval(this.timerRender);
    this.stateBtn.classList.remove('play');
    this.stateBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    sound.stopBackground();
  }

  stopPopup(message) {
    this.stop(message);
  }

  timer() {
    let setTime = parseInt(this.time);
    let min = '';
    let sec = '';
    this.timerRender = setInterval(() => {
      min = Math.floor(setTime / 60);
      sec = setTime % 60;

      this.remainTime.textContent = `${min} : ${sec}`;
      setTime--;

      if (setTime < 0) {
        clearInterval(this.timerRender);
        this.stopGame();
        this.stopPopup(Reason.lose);
        sound.playAlert();
      }
    }, 1000);
  }

  isPlay() {
    return this.stateBtn.classList.contains('play');
  }
  carrotCatch() {
    this.catchCarrotCnt--;
    this.carrotCnt.textContent = this.catchCarrotCnt;
    if (this.catchCarrotCnt == 0) {
      this.stopPopup(Reason.win);
      this.stopGame();
      sound.playWin();
    }
  }
}
