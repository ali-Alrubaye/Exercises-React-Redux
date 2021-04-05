import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR,
  REGISTER_SUCCESS,
  REMOVE_SUCCESS,
} from './ScoreTypes';

const initialState = {
  loading: false,
  error: '',
  highscores: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        highscores: [],
        error: '',
      };
    case FETCH_SUCCESS:
      console.log('Fetch Success ', action.payload);
      return {
        ...state,
        loading: false,
        highscores: action.payload,
        error: '',
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        highscores: [],
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      // const add_state = [...state.highscores];
      // add_state = [...state.highscores, action.payload];
      console.log('Reduser => ', state.highscores);
      return {
        ...state,
        loading: false,
        highscores: [...state.highscores, action.payload],
        error: '',
      };
    case REMOVE_SUCCESS:
      let tt = state.highscores.filter((scor) => scor._id !== action.payload);
      console.log('state.highscores', state.highscores);
      console.log(tt);
      return {
        ...state,
        loading: false,
        highscores: state.highscores.filter(
          (scor) => scor._id !== action.payload
        ),
        error: '',
      };
    default:
      return state;
  }
};

export default reducer;
