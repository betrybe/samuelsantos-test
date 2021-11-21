// eslint-disable-next-line import/prefer-default-export
export function loggin(user) {
  return {
    type: 'Login',
    payload: user,
  };
}

export function logout() {
  return {
    type: 'Logout',
  };
}
