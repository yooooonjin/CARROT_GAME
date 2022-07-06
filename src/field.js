'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.field');
    this.field.addEventListener('click', this.onClick);
    this.fieldRect = this.field.getBoundingClientRect();
  }

  init() {
    this.field.innerHTML = '';
    this.render();
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = (e) => {
    if (e.target.classList.contains('carrot')) {
      e.target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
    } else if (e.target.classList.contains('bug')) {
      this.onItemClick && this.onItemClick('bug');
      sound.playAlert();
    }
  };

  render() {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < this.carrotCount; i++) {
      const carrot = document.createElement('img');
      carrot.setAttribute('class', 'carrot');
      carrot.setAttribute('src', './img/carrot.png');
      carrot.style.position = 'absolute';

      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      carrot.style.left = `${x}px`;
      carrot.style.top = `${y}px`;
      this.field.append(carrot);
    }
    for (let j = 0; j < this.bugCount; j++) {
      const bug = document.createElement('img');
      bug.setAttribute('class', 'bug');
      bug.setAttribute('src', './img/bug.png');
      bug.style.position = 'absolute';

      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      bug.style.left = `${x}px`;
      bug.style.top = `${y}px`;
      this.field.append(bug);
    }
  }
}

function randomNumber(max, min) {
  return Math.random() * (max - min) + min;
}
