export const GET_USER = 'GET_USER';
export const GET_WALLET = 'GET_WALLET';
export const SUM_EXPENSES = 'SUM_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_SAVED_EXPENSE = 'EDIT_SAVED_EXPENSE';

export const getUser = (email) => ({
  type: GET_USER,
  payload: email,
});

export const getWallet = (wallet) => ({
  type: GET_WALLET,
  payload: wallet,
});

export const addExpenses = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const {
    id,
    value,
    description,
    currency,
    method,
    tag,
  } = expense;

  return dispatch({
    type: SUM_EXPENSES,
    payload: {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    },
  });
};

export function deleteExpense(id) {
  return {
    type: DELETE_EXPENSE,
    payload: id,
  };
}

export function editSavedExpense(payload) {
  return {
    type: EDIT_SAVED_EXPENSE,
    payload,
  };
}

export function editExpense(payload) {
  return {
    type: EDIT_EXPENSE,
    payload,
  };
}
