import {
  FETCH_GAME_REQUEST,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_ERROR,
  REGISTER_GAME_SUCCESS,
  REMOVE_GAME_SUCCESS,
} from './GameTypes';

import scoreServices from '../../services/Service';

export const fetchGame = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_GAME_REQUEST });
    scoreServices
      .getAllGame()
      .then((response) => {
        dispatch({ type: FETCH_GAME_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_GAME_ERROR, payload: error.message });
      });
  };
};
export const deleteGame = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_GAME_REQUEST });
    scoreServices
      .deleteScores(id)
      .then((response) => {
        console.log(response);
        // dispatch({ type: FETCH_GAME_ERROR, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        // dispatch({ type: FETCH_GAME_ERROR, payload: error.message });
      });
  };
};
