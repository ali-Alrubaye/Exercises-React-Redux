import {
  FETCH_GAME_REQUEST,
  FETCH_GAME_SUCCESS,
  FETCH_GAME_ERROR,
  REGISTER_GAME_SUCCESS,
  REMOVE_GAME_SUCCESS,
} from './GameTypes';

const initialState = {
  loading: false,
  error: '',
  games: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAME_REQUEST:
      return {
        ...state,
        loading: true,
        games: [],
        error: '',
      };
    case FETCH_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        games: action.payload,
        error: '',
      };
    case FETCH_GAME_ERROR:
      return {
        ...state,
        loading: false,
        games: [],
        error: action.payload,
      };
    case REGISTER_GAME_SUCCESS:
      // const add_state = [...state.games];
      // add_state = [...state.games, action.payload];
      return {
        ...state,
        loading: false,
        games: [...state.games, action.payload],
        error: '',
      };
    case REMOVE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        games: state.games.filter((scor) => scor._id !== action.payload),
        error: '',
      };
    default:
      return state;
  }
};

export default reducer;
