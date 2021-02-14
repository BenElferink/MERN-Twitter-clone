import { useRef, useState } from 'react';
import styles from './index.module.css';
import ShowPassIcon from '../../icons/ShowPass';
import HidePassIcon from '../../icons/HidePass';

export default function Input({ label, type, name, value, onChange }) {
  const inputRef = useRef(null);
  const focusOnInput = () => inputRef.current.focus();

  const [inpType, setInpType] = useState(type);

  return (
    <div className={styles.inpGroup} onClick={focusOnInput}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        type={inpType}
        name={name}
        id={name}
        placeholder=' '
      />
      {type === 'password' && inpType === 'password' ? (
        <ShowPassIcon onClick={() => setInpType('text')} />
      ) : type === 'password' && inpType === 'text' ? (
        <HidePassIcon onClick={() => setInpType('password')} />
      ) : null}

      <label htmlFor={name}>{label}</label>
    </div>
  );
}
