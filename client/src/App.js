import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './actions/userActions';
import './styles/styles.css';
import axios from './api';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
const PublicPage = lazy(() => import('./pages/PublicPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterModal = lazy(() => import('./pages/RegisterModal'));
const FeedPage = lazy(() => import('./pages/FeedPage'));

export default function App() {
  const [isRegister, setIsRegister] = useState(false);
  const clickRegister = () => setIsRegister(true);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/users/authenticate');
        console.log(`✅ ${response.status} ${response.statusText}`);
        dispatch(login(response.data.user));
      } catch (error) {
        console.error('❌', error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      <Router>
        {isRegister && (
          <LazyLoad>
            <RegisterModal />
          </LazyLoad>
        )}

        <Switch>
          <LazyLoad>
            <ProtectedRoute
              exact
              path='/'
              Public={() => <PublicPage clickRegister={clickRegister} />}
              Private={() => <FeedPage />}
            />
            <ProtectedRoute
              path='/login'
              Public={() => <LoginPage clickRegister={clickRegister} />}
              Private={() => <Redirect to='/' />}
            />
          </LazyLoad>
        </Switch>
      </Router>
    </div>
  );
}

function LazyLoad({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
