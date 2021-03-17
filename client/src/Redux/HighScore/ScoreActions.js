import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  REGISTER_SUCCESS,
  REMOVE_SUCCESS,
} from './ScoreTypes';

import scoreServices from '../../services/Service';
import { toast } from 'react-toastify';

export const getSortScoreByGame = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_REQUEST });
    scoreServices
      .getHighScores()
      .then((response) => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const deleteHighScore = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_REQUEST });
    scoreServices
      .deleteScores(id)
      .then((response) => {
        console.log(response);
        // dispatch({ type: REMOVE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        // dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const registerHighScore = (data) => {
  return (dispatch) => {
    dispatch({ type: FETCH_REQUEST });
    scoreServices
      .addScore(data)
      .then((response) => {
        toast.success('Added SUCCESS');
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        toast.success(error);
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
