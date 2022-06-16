'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 90;

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  initField() {
    this.field.innerHTML = '';
    this._createImg('bug', this.bugCount, './img/bug.png');
    this._createImg('carrot', this.carrotCount, './img/carrot.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _createImg(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');
      img.setAttribute('class', className);
      img.setAttribute('src', imgPath);
      const left = randomNumber(x1, x2);
      const top = randomNumber(y1, y2);
      img.style.left = `${left}px`;
      img.style.top = `${top}px`;
      this.field.appendChild(img);
    }
  }

  onClick = (e) => {
    const target = e.target;
    if (target.matches('.bug')) {
      sound.playBug();
      this.onItemClick && this.onItemClick(ItemType.bug);
    } else if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
