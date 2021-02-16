import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import Loading from '../Loading';
import axios from '../../api';
import { login } from '../../actions/userActions';

export default function ProtectedRoute({ Private, Public, ...rest }) {
  const { isLoggedIn } = useSelector((state) => state.user);

  const [isRequesting, setIsRequesting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsRequesting(true);
      try {
        const response = await axios.get('/auth');
        console.log(`✅ ${response.status} ${response.statusText}`);
        dispatch(login(response.data.user));
        setIsRequesting(false);
      } catch (error) {
        console.error('❌', error);
        setIsRequesting(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (isRequesting) {
    return <Loading height='100vh' />;
  } else {
    return (
      <Route
        {...rest}
        // return a Route
        // which conditionally renders on of the following
        render={(props) => {
          if (isLoggedIn) {
            return <Private />;
          } else {
            return <Public />;
          }
        }}
      />
    );
  }
}
