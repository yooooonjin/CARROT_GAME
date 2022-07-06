'use strict';

import Popup from './popup.js';
import Field from './field.js';
import GameBuilder from './game.js';
import * as sound from './sound.js';

let catchCarrotCnt = 10;
let catchBugCnt = 10;
let time = 10;

const gameStopBanner = new Popup();
gameStopBanner.setClickListener(() => {
  game.playGame();
});

const gameField = new Field(catchCarrotCnt, catchBugCnt);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!game.isPlay()) {
    return;
  }
  if (item === 'carrot') {
    game.carrotCatch();
  } else if (item === 'bug') {
    gameStopBanner.render('YOU LOST');
    game.stopGame();
  }
}

const game = new GameBuilder().withGameTime(10).withCatchCarrotCnt(10).build();

game.setGameState(playGameState, stopGameState);

function playGameState() {
  gameStopBanner.hide();
  gameField.init();
}

function stopGameState(message) {
  gameStopBanner.render(message);
}
