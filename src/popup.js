'use strict';

export default class Popup {
  constructor() {
    this.replay = document.querySelector('.replay-wrap');
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }
  render(message) {
    this.replay.innerHTML = `
            <div class="replay">
                <button class="replay-btn">
                <i class="fa-solid fa-rotate-right"></i>
                </button>
                <p>${message}</p>
            </div>
        `;
    this.replayBtn = document.querySelector('.replay-btn');
    this.replayBtn.addEventListener('click', () => {
      this.onClick();
      this.hide();
    });
  }
  hide() {
    this.replay.innerHTML = '';
  }
}
