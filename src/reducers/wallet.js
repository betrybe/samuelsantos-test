// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  currentId: 0,
  currentTotal: 0,
  isEdit: false,
  currentExpenseEdit: null,
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
  if (expense.id == null || expense.id === '') {
    expense.id = state.currentId;
    expenses.push(expense);
    return {
      ...state,
      expenses,
      isEdit: false,
      currentId: state.currentId + 1,
      currentTotal: getTotalValue(expenses),
      currentExpenseEdit: null,
    };
  }
  expense.id = parseInt(expense.id, 10);
  const newEspense = expenses.map((expenseItem) => {
    if (expenseItem.id === expense.id) return expense;
    return expenseItem;
  });
  return {
    ...state,
    expenses: newEspense,
    currentTotal: getTotalValue(newEspense),
    isEdit: false,
    currentExpenseEdit: null,
  };
}

function deleteExpense(state, payload) {
  const { expense } = payload;
  const { expenses } = state;

  const newExpenseAfterDelete = expenses.filter(
    (expenseItem) => expenseItem.id !== expense.id,
  );
  return {
    ...state,
    expenses: newExpenseAfterDelete,
    currentTotal: getTotalValue(newExpenseAfterDelete),
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
  case 'addMoedas':
    return { ...state, currencies: action.payload.moedas };
  case 'saveExpense':
    return saveExpense(state, action.payload);
  case 'deleteExpense':
    return deleteExpense(state, action.payload);
  case 'selectEditExpense':
    return { ...state, currentExpenseEdit: action.payload.expense, isEdit: true };
  default:
    return state;
  }
}
