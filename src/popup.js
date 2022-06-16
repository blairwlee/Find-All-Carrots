'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.pop-up__text');
    this.btnReplay = document.querySelector('.pop-up__replay');
    this.btnReplay.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  show(message) {
    this.popUpText.innerText = message;
    this.popUp.classList.remove('display-none');
  }

  hide() {
    this.popUp.classList.add('display-none');
  }
}
