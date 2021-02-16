import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './styles/styles.css';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
const PublicPage = lazy(() => import('./pages/PublicPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterModal = lazy(() => import('./pages/RegisterModal'));
const TwitterPage = lazy(() => import('./pages/TwitterPage'));

export default function App() {
  const [isRegister, setIsRegister] = useState(false);
  const clickRegister = () => setIsRegister(true);

  return (
    <div className='App'>
      <Router>
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
                <TwitterPage />
              </LazyLoad>
            )}
          />

          <ProtectedRoute
            exact
            path='/login'
            Public={() => (
              <LazyLoad>
                <LoginPage clickRegister={clickRegister} />
              </LazyLoad>
            )}
            Private={() => <Redirect to='/' />}
          />

          {isRegister && (
            <LazyLoad>
              <RegisterModal closeModal={() => setIsRegister(false)} />
            </LazyLoad>
          )}
        </Switch>
      </Router>
    </div>
  );
}

function LazyLoad({ children }) {
  return <Suspense fallback={<Loading height='100vh' />}>{children}</Suspense>;
}
