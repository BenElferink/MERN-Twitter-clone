import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import axios from '../../api';
import Loading from '../Loading';
import Button from '../Button';
import Input from '../Input';
import PicSelector from '../PicSelector';
import TwitterIcon from '../../icons/Twitter';
import BackIcon from '../../icons/Back';
import WhoToFollow from '../WhoToFollow';
import IconButton from '../IconButton';

export default function RegisterForm({ closeModal }) {
  const [phase, setPhase] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phase === 3) {
      setSubmitting(true);
      const formData = {
        name,
        username,
        email,
        password,
        imageBase64: profilePic.base64,
      };

      try {
        const response = await axios.post('/auth/register', formData);
        console.log(`✅ ${response.status} ${response.statusText}`);
        dispatch(login({ user: response.data.user, token: response.data.token }));
        setSubmitting(false);
        setPhase(4);
        alert('account registered successfully');
      } catch (error) {
        console.error('❌', error);
        setSubmitting(false);
        if (error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          alert('an unnexpected error occurred');
        }
      }
    }
  };

  const navStyles = {
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
    },
    svgStyles = {
      width: '25px',
      height: '25px',
      fill: 'var(--twitterBlue)',
    },
    navBtnStyles = {
      width: '60px',
      lineHeight: '25px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    skipStyles = {
      whiteSpace: 'nowrap',
      justifyContent: 'flex-end',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'var(--twitterBlue)',
      fontSize: '1em',
      fontWeight: '600',
    },
    titleStyles = {
      margin: '10px 0 20px 0',
      fontSize: '1.5em',
      fontWeight: '100 !important',
    };

  const None = () => <div style={{ width: '70px' }} />;

  return (
    <form onSubmit={handleSubmit}>
      {/* form nav (phase controller) */}
      <div style={navStyles}>
        {phase !== 1 && phase !== 4 ? (
          <IconButton>
            <BackIcon style={svgStyles} onClick={() => setPhase(phase - 1)} />
          </IconButton>
        ) : (
          <None />
        )}

        <TwitterIcon style={{ ...svgStyles, position: 'absolute', left: 'calc(50% - 15px)' }} />

        {phase === 2 && !profilePic ? (
          <button style={{ ...navBtnStyles, ...skipStyles }} onClick={() => setPhase(phase + 1)}>
            Skip for now
          </button>
        ) : phase === 3 ? (
          <None />
        ) : phase === 4 ? (
          <button style={{ ...navBtnStyles, ...skipStyles }} onClick={closeModal}>
            Skip for now
          </button>
        ) : (
          <Button
            style={navBtnStyles}
            text='Next'
            design='filled'
            onClick={() => setPhase(phase + 1)}
            disabled={phase === 1 && (name === '' || email === '' || password === '')}
          />
        )}
      </div>

      {/* phase title */}
      <h2 style={titleStyles}>
        {phase === 1
          ? 'Create your account'
          : phase === 2
          ? 'Pick a profile picture'
          : phase === 3
          ? 'Verify your account details'
          : phase === 4
          ? 'Who to follow'
          : ''}
      </h2>

      {phase === 2 || phase === 3 ? (
        // react-file-base64
        <PicSelector pic={profilePic} setPic={setProfilePic} />
      ) : null}

      {/* phase inputs */}
      {phase === 1 || phase === 3 ? (
        <Input
          label='Name'
          name='name'
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setUsername(e.target.value.replaceAll(' ', ''));
          }}
        />
      ) : null}
      {phase === 3 && (
        <Input
          label='Username'
          name='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      {phase === 1 || phase === 3 ? (
        <Fragment>
          <Input
            label='Email'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label='Password'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Fragment>
      ) : null}

      {/* submit */}
      {phase === 3 && submitting ? (
        <Loading />
      ) : phase === 3 && !submitting ? (
        <Button text='Sign up' design='filled' type='submit' />
      ) : null}

      {/* list of people on twitter */}
      {phase === 4 && <WhoToFollow height='470' />}
    </form>
  );
}
