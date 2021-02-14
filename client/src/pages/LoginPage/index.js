import styles from './index.module.css';
import TwitterIcon from '../../icons/Twitter';
import LoginForm from '../../components/LoginForm';

export default function LoginPage({ clickRegister }) {
  return (
    <div className={styles.page}>
      <TwitterIcon />
      <h2>Log in to Twitter</h2>
      <LoginForm onPage='login' clickRegister={clickRegister} />
    </div>
  );
}
