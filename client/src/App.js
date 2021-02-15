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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsSubmitting(true);
      try {
        const response = await axios.get('/users/authenticate');
        console.log(`✅ ${response.status} ${response.statusText}`);
        dispatch(login(response.data.user));
        setIsSubmitting(false);
      } catch (error) {
        console.error('❌', error);
        setIsSubmitting(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      {isSubmitting ? (
        <Load />
      ) : (
        <Router>
          {isRegister && (
            <LazyLoad>
              <RegisterModal />
            </LazyLoad>
          )}

          <Switch>
            <ProtectedRoute
              exact
              path='/'
              Public={() => (
                <LazyLoad>
                  <PublicPage clickRegister={clickRegister} />
                </LazyLoad>
              )}
              Private={() => (
                <LazyLoad>
                  <FeedPage />
                </LazyLoad>
              )}
            />

            <ProtectedRoute
              path='/login'
              Public={() => (
                <LazyLoad>
                  <LoginPage clickRegister={clickRegister} />
                </LazyLoad>
              )}
              Private={() => <Redirect to='/' />}
            />
          </Switch>
        </Router>
      )}
    </div>
  );
}

function Load() {
  return <Loading height='100vh' />;
}

function LazyLoad({ children }) {
  return <Suspense fallback={<Load />}>{children}</Suspense>;
}
