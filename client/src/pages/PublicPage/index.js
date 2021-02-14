import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import TwitterIcon from '../../icons/Twitter';
import LoginForm from '../../components/LoginForm';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

export default function PublicPage({ clickRegister }) {
  const history = useHistory();

  return (
    <div className={styles.page}>
      {/* auth section */}
      <div className={styles.auth}>
        <LoginForm onPage='public' />
        <div className={styles.welcome}>
          <TwitterIcon />
          <h1>Happening now</h1>
          <h2>Join Twitter today.</h2>
          <div className={styles.buttons}>
            <Button text='Sign up' design='filled' onClick={clickRegister} />
            <Button text='Log in' design='outlined' onClick={() => history.push('/login')} />
          </div>
        </div>
      </div>

      {/* banner section */}
      <div className={styles.banner}>
        <TwitterIcon />
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}
