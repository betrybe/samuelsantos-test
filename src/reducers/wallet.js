// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  currentId: 0,
  currentTotal: 0,
};

function getTotalValue(expenses) {
  let valueTotal = 0.00;
  if (expenses.length <= 0) return valueTotal;

  expenses.forEach((expense) => {
    valueTotal
      += parseFloat(expense.value)
      * parseFloat(expense.exchangeRates[expense.currency].ask);
  });
  return parseFloat(valueTotal).toFixed(2);
}

function saveExpense(state, payload) {
  const { expense } = payload;
  const { expenses } = state;
  if (payload.expense.id == null) {
    expense.id = state.currentId;
    expenses.push(expense);
    return {
      ...state,
      expenses: expenses,
      currentId: state.currentId + 1,
      currentTotal: getTotalValue(expenses),
    };
  }
  return { state };
}

export default function (state = initialState, action) {
  switch (action.type) {
  case 'addMoedas':
    return { ...state, currencies: action.payload.moedas };
  case 'saveExpense':
    return saveExpense(state, action.payload);

  default:
    return state;
  }
}
