const initialState = {
  isLoggedIn: false,
  token: localStorage.getItem('token') || null,
  id: null,
  name: null,
  username: null,
  profilePicture: null,
  following: [],
  followers: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      action.token && localStorage.setItem('token', action.token);
      return { isLoggedIn: true, token: action.token, ...action.payload };

    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...initialState, token: null };

    default:
      return state;
  }
};
