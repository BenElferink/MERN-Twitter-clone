import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import axios from '../../api';
import Input from '../Input';
import Button from '../Button';
import Loading from '../Loading';
import styles from './index.module.css';

export default function LoginForm({ onPage, clickRegister }) {
  const [submitting, setSubmitting] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = {
      username,
      password,
    };

    try {
      const response = await axios.post('/users/login', formData);
      console.log(`✅ ${response.status} ${response.statusText}`);
      setSubmitting(false);

      dispatch(login(response.data.user));
      alert('logged in successfully');
    } catch (error) {
      console.error('❌', error);
      setSubmitting(false);

      if (error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert('an unnexpected error occurred');
      }
    }
  };

  return (
    <form className={styles[onPage]} onSubmit={handleSubmit}>
      {/* form inputs */}
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

      {/* submit */}
      {submitting ? (
        <Loading />
      ) : (
        <Button text='Log in' design={onPage === 'public' ? 'outlined' : 'filled'} type='submit' />
      )}

      {/* register (conditional) */}
      {onPage === 'login' && (
        <button className={styles.register} onClick={clickRegister}>
          Sign up for Twitter
        </button>
      )}
    </form>
  );
}
