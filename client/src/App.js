import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/styles.css';
import Loading from './components/Loading';
const PublicPage = lazy(() => import('./pages/PublicPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

export default function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route exact path='/' component={PublicPage} />
            <Route exact path='/login' component={LoginPage} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}
