import { GET_WALLET,
  SUM_EXPENSES,
  DELETE_EXPENSE,
  EDIT_SAVED_EXPENSE,
  EDIT_EXPENSE } from '../actions';

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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_SAVED_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      editor: false,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      editExpense: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
