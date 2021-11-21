// Esse reducer será responsável por tratar as informações da pessoa usuária

const initialState = { email: '' };

export default function (state = initialState, action) {
  switch (action.type) {
  case 'Login':
    return { ...state, email: action.payload.email };

  case 'Logout':
    return { ...state, email: '' };

  default:
    return state;
  }
}
