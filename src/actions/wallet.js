import { response } from '../tests/mockData';

export function addMoedas(moedas) {
  return {
    type: 'addMoedas',
    payload: moedas,
  };
}

export function saveExpense(expense) {
  return {
    type: 'saveExpense',
    payload: expense,
  };
}

export function deleteExpense(expense) {
  return {
    type: 'deleteExpense',
    payload: expense,
  };
}

export const fetchCurrencies = (paylaod) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json()).then((result) => {
      paylaod.expense.exchangeRates = result;
      dispatch(saveExpense(paylaod));
    });
};
