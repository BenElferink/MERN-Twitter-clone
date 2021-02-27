import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import axios from '../../api';
import Loading from '../Loading';

export default function ProtectedRoute({ Private, Public, ...rest }) {
  const [isRequesting, setIsRequesting] = useState(true);
  const { isLoggedIn, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // this side effect tries to fetch the user data,
  // the server will validate the cookie and decide the fate of this route,
  // if the validation passed, then the user will be stored in the global state, and the Private Component will render,
  // if the validation failed, then the Public Component will be rendered
  useEffect(() => {
    (async () => {
      if (token)
        try {
          const response = await axios.get('/auth', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          });
          dispatch(login({ user: response.data.user, token: response.data.token }));
        } catch (error) {
          console.error(error.message);
        }

      setIsRequesting(false);
    })();
    // eslint-disable-next-line
  }, []);

  if (isRequesting) {
    return <Loading height='100vh' />;
  } else {
    return <Route {...rest} render={(props) => (isLoggedIn ? <Private /> : <Public />)} />;
  }
}
