import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import axios from '../../api';
import Input from '../Input';
import Button from '../Button';
import Loading from '../Loading';
import useMediaQuery from '../../hooks/useMediaQuery';

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
      const response = await axios.post('/auth/login', formData);
      console.log(`✅ ${response.status} ${response.statusText}`);
      dispatch(login({ user: response.data.user, token: response.data.token }));
    } catch (error) {
      console.error('❌', error);
      setSubmitting(false);
      if (error?.response?.status === 400) {
        alert(error.response.data.message);
      } else {
        alert('an unnexpected error occurred');
      }
    }
  };

  const isDesktop = useMediaQuery('(min-width: 992px)'),
    formStylesPublicPage = {
      display: isDesktop ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      maxWidth: '650px',
      width: '100%',
    },
    formStylesLoginPage = {
      width: '100%',
      height: '240px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    };

  return (
    <form
      style={onPage === 'public' ? formStylesPublicPage : formStylesLoginPage}
      onSubmit={handleSubmit}>
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
        <Button
          type='submit'
          text='Log in'
          design={onPage === 'public' ? 'outlined' : 'filled'}
          style={onPage === 'public' ? { width: '220px' } : {}}
        />
      )}

      {/* register (conditional) */}
      {onPage === 'login' && <RegisterButton clickRegister={clickRegister} />}
    </form>
  );
}

function RegisterButton({ clickRegister }) {
  const ref = useRef(null);

  const btnStyles = {
      width: '100%',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'var(--twitterBlue)',
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    doHoverStyles = () => (ref.current.style.textDecoration = 'underline'),
    undoHoverStyles = () => (ref.current.style.textDecoration = 'unset');

  return (
    <button
      ref={ref}
      style={btnStyles}
      onMouseEnter={doHoverStyles}
      onMouseLeave={undoHoverStyles}
      onClick={clickRegister}>
      Sign up for Twitter
    </button>
  );
}
