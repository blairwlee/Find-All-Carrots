'use strict';

import { GameBuilder, Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(10)
  .withBugCount(10)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      sound.playAlert();
      message = 'Replay ❓';
      break;
    case Reason.win:
      sound.playWin();
      message = 'YOU WON 😊';
      break;
    case Reason.lose:
      message = 'YOU LOST 😥';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.show(message);
});

const handleGameStart = () => {
  game.start();
};
gameFinishBanner.setClickListener(handleGameStart);
