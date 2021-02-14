import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/styles.css';
import Loading from './components/Loading';
const PublicPage = lazy(() => import('./pages/PublicPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterModal = lazy(() => import('./components/RegisterModal'));

export default function App() {
  const [isRegister, setIsRegister] = useState(false);
  const clickRegister = () => setIsRegister(true);

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
            <Route exact path='/'>
              <PublicPage clickRegister={clickRegister} />
            </Route>
            <Route exact path='/login'>
              <LoginPage clickRegister={clickRegister} />
            </Route>
          </LazyLoad>
        </Switch>
      </Router>
    </div>
  );
}

function LazyLoad({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
