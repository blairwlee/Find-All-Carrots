'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(this.gameDuration, this.carrotCount, this.bugCount);
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.btnGame = document.querySelector('.game__button');
    this.btnGame.addEventListener('click', () => {
      if (!this.started) {
        this.start();
      } else {
        this.end(Reason.cancel);
      }
    });

    this.timer = document.querySelector('.game__timer');
    this.scoreBoard = document.querySelector('.game__score');

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timeCounter = undefined;
    this.timeLeft = this.gameDuration;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.init();
    this.startGameTimer();
    this.showStopButton();
    this.showTimerAndScore();
    sound.playBg();
  }

  end(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.freezeImg();
    sound.stopBg();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.end(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.end(Reason.lose);
    }
  };

  showStopButton() {
    const btnGameImg = document.querySelector('.game__button__img');
    btnGameImg.src = './img/stop-solid.png';
    this.btnGame.classList.remove('visibility-hidden');
  }

  hideGameButton() {
    this.btnGame.classList.add('visibility-hidden');
  }

  freezeImg() {
    const bugs = document.querySelectorAll('.bug');
    const carrots = document.querySelectorAll('.carrot');
    bugs.forEach((bug) => bug.classList.add('pointer-events-none'));
    carrots.forEach((carrot) => carrot.classList.add('pointer-events-none'));
  }

  showTimerAndScore() {
    this.timer.classList.remove('visibility-hidden');
    this.scoreBoard.classList.remove('visibility-hidden');
  }

  init() {
    this.score = 0;
    this.scoreBoard.innerText = this.carrotCount;
    this.gameField.initField();
  }

  startGameTimer() {
    this.timeLeft = this.gameDuration;
    this.updateTimerText(this.timeLeft);
    this.timeCounter = setInterval(() => {
      if (this.timeLeft <= 0) {
        this.end(Reason.lose);
        return;
      }
      this.updateTimerText(--this.timeLeft);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timeCounter);
  }

  updateTimerText(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;
    this.timer.innerText = `${minutes}:${seconds}`;
  }

  updateScoreBoard() {
    this.scoreBoard.innerText = this.carrotCount - this.score;
  }
}
