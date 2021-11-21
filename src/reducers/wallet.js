// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case 'addMoedas':
    return { ...state, currencies: action.payload.moedas };

  default:
    return state;
  }
}
