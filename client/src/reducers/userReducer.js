const initialState = {
  isLoggedIn: false,
  id: null,
  name: null,
  username: null,
  profilePicture: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isLoggedIn: true, ...action.payload };

    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
};
