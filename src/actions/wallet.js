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

export function selectEditExpense(expense) {
  return {
    type: 'selectEditExpense',
    payload: expense,
  };
}

export const fetchMoeda = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all').then((response) => {
    response.json().then((results) => {
      const resultToArray = Object.keys(results);
      dispatch(addMoedas({ moedas: resultToArray.filter(
        (element) => element !== 'USDT' && element !== 'DOGE',
      ) }));
    });
  });
};

export const fetchCurrencies = (paylaod) => (dispatch) => {
  if (paylaod.expense.exchangeRates !== null) dispatch(saveExpense(paylaod));
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json()).then((result) => {
      paylaod.expense.exchangeRates = result;
      dispatch(saveExpense(paylaod));
    });
};
