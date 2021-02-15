import styles from './index.module.css';
import RegisterForm from '../../components/RegisterForm';

export default function RegisterModal({ closeModal }) {
  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>
        <RegisterForm closeModal={closeModal} />

        {/* bottom disclaimer */}
        <p className={styles.disclaimer}>
          Note: creating an account does not apply to the real Twitter, this is just a clone for my
          portfolio. Data used for this clone will not be shared, and is stored securely.
        </p>
      </div>
    </div>
  );
}
