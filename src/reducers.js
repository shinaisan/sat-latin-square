import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const options = (state = { size: 2 }, action) => {
  switch (action.type) {
    case 'OPTIONS_SET':
      return {
        ...state,
        options: action.options
      };
    default:
      return state;
  }
};

const paginate = (state = { page: 0 }, action) => {
  switch (action.type) {
    case 'PAGE_SET':
      return {
        page: action.page,
      };
    default:
      return state;
  }
}

const INITIAL_SAT = { busy: false, problem: null, solutions: null };
const sat = (state = INITIAL_SAT, action) => {
  switch (action.type) {
    case 'SOLVER_START':
      return {
        ...state,
        busy: true,
        problem: action.problem,
        solutions: null
      };
    case 'SOLVER_STOP':
      return {
        ...state,
        busy: false,
        problem: action.problem,
        solutions: action.solutions
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  form: formReducer,
  options,
  paginate,
  sat
});

export default rootReducer;

