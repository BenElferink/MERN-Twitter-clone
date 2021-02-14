import styles from './index.module.css';

export default function Modal({ children }) {
  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}
