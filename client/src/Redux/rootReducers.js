import { combineReducers } from 'redux';

import scoreReducer from './HighScore/ScoreReducer';
import gameReducer from './Game/GameReducer';

const rootReducer = combineReducers({
  highscores: scoreReducer,
  game: gameReducer,
});

export default rootReducer;
