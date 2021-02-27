import { useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './styles/styles.css';
import ProtectedRoute from './components/ProtectedRoute';
import PublicPage from './pages/PublicPage';
import LoginPage from './pages/LoginPage';
import RegisterModal from './pages/RegisterModal';
import TwitterPage from './pages/TwitterPage';

export default function App() {
  const [isRegister, setIsRegister] = useState(false);
  const clickRegister = () => setIsRegister(true);

  return (
    <div className='App'>
      <Router>
        {isRegister && <RegisterModal closeModal={() => setIsRegister(false)} />}
        <Switch>
          <ProtectedRoute
            exact
            path='/login'
            Public={() => <LoginPage clickRegister={clickRegister} />}
            Private={() => <Redirect to='/' />}
          />

          <ProtectedRoute
            exact
            path='/'
            Public={() => <PublicPage clickRegister={clickRegister} />}
            Private={() => <TwitterPage />}
          />
        </Switch>
      </Router>
    </div>
  );
}
