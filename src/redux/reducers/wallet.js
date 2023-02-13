import { GET_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_WALLET:
    return {
      ...state,
      expenses: action.payload,
      currencies: Object.keys(action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
