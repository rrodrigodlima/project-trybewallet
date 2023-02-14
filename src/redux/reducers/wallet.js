import { GET_WALLET, SUM_EXPENSES } from '../actions';

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
      expense: action.payload,
      currencies: Object.keys(action.payload),
    };
  case SUM_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.payload }],
    };
  default:
    return state;
  }
};

export default wallet;
