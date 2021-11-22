export default function loggin(user) {
  return {
    type: 'Login',
    payload: user,
  };
}
