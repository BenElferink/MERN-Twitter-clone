import { useState } from 'react';
import styles from './index.module.css';
import Input from '../Input';
import Button from '../Button';

export default function LoginForm({ onPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles[onPage]} onSubmit={handleSubmit}>
      <Input
        label='Username'
        name='username'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label='Password'
        name='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text='Log in' design={onPage === 'public' ? 'outlined' : 'filled'} type='submit' />
    </form>
  );
}
