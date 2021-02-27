export const login = (data) => ({
  type: 'LOGIN',
  payload: data.user,
  token: data.token,
});

export const logout = () => ({
  type: 'LOGOUT',
});
