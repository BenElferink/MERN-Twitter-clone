import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';

export default function LoginForm({ layout }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {};

  return (
    <form className={layout} onSubmit={handleSubmit}>
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
      <Button text='Log in' design='outlined' type='submit' />
    </form>
  );
}
