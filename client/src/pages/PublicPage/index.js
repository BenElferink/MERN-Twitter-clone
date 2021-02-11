import styles from './index.module.css';
import TwitterIcon from '../../icons/Twitter';
import LoginForm from '../../components/LoginForm';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

export default function PublicPage() {
  return (
    <div className={styles.page}>
      {/* auth section */}
      <div className={styles.auth}>
        <LoginForm layout={styles.formLayout} />
        <div className={styles.welcome}>
          <TwitterIcon />
          <h1>Happening now</h1>
          <h2>Join Twitter today.</h2>
          <div className={styles.buttons}>
            <Button text='Sign up' design='filled' onClick={() => null} />
            <Button text='Log in' design='outlined' onClick={() => null} />
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
