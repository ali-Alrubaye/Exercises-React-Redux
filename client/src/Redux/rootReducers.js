import { combineReducers } from 'redux';

import scoreReducer from './HighScore/ScoreReducer';
import gameReducer from './Game/GameReducer';

const rootReducer = combineReducers({
  highScore: scoreReducer,
  game: gameReducer,
});

export default rootReducer;
