import styles from './index.module.css';

export default function Button({ children, design, text, onClick, type, disabled }) {
  return (
    <button
      className={styles.btn + ' ' + styles[design]}
      onClick={onClick ? onClick : () => null}
      disabled={disabled}
      type={type ? type : ''}>
      {children || text}
    </button>
  );
}
