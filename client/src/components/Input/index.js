import { useRef } from 'react';
import styles from './index.module.css';

export default function Input({ label, type, name, value, onChange }) {
  const inputRef = useRef(null);
  const focusOnInput = () => inputRef.current.focus();

  return (
    <div className={styles.inpGroup} onClick={focusOnInput}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        placeholder=' '
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}
