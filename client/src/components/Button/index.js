import styles from './index.module.css';

export default function Button({ design, text, onClick, type }) {
  return (
    <div
      className={styles.btn + ' ' + styles[design]}
      onClick={onClick ? onClick : () => null}
      type={type ? type : ''}>
      {text}
    </div>
  );
}
