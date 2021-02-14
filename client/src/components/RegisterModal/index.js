import { Fragment, useState } from 'react';
import styles from './index.module.css';
import FileBase64 from 'react-file-base64';
import axios from '../../api';
import Modal from '../Modal';
import Loading from '../Loading';
import Button from '../Button';
import Input from '../Input';
import TwitterIcon from '../../icons/Twitter';
import BackIcon from '../../icons/Back';
import CameraIcon from '../../icons/Camera';

export default function RegisterModal() {
  const [phase, setPhase] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phase === 3) {
      setSubmitting(true);

      try {
        const response = await axios.post('/users/new', {
          name,
          username,
          email,
          password,
          imageBase64: profilePic,
        });
        console.log(response);
        alert('success');
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        if (error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          alert('❌ An unnexpected error occurred');
        }
        setSubmitting(false);
      }
    }
  };

  const None = () => <div style={{ width: '70px' }} />;

  return (
    <Modal>
      <form className={styles.main} onSubmit={handleSubmit}>
        {/* top nav */}
        <div className={styles.nav}>
          {phase !== 1 ? (
            <BackIcon className={styles.back} onClick={() => setPhase(phase - 1)} />
          ) : (
            <None />
          )}
          <TwitterIcon />
          {phase === 2 && !profilePic ? (
            <button className={styles.skip} onClick={() => setPhase(phase + 1)}>
              Skip for now
            </button>
          ) : phase === 3 ? (
            <None />
          ) : (
            <Button
              text='Next'
              design='filled'
              onClick={() => setPhase(phase + 1)}
              disabled={phase === 1 && (name === '' || email === '' || password === '')}
            />
          )}
        </div>

        {/* phase title */}
        {phase === 1 || phase === 3 ? (
          <h2>Create your account</h2>
        ) : phase === 2 ? (
          <h2>Pick a profile picture</h2>
        ) : null}

        {/* phase contents */}
        {phase === 2 || phase === 3 ? (
          <div className={styles.picSelect}>
            <FileBase64 multiple={false} onDone={(file) => setProfilePic(file)} />
            {profilePic ? <img src={profilePic.base64} alt='' /> : <CameraIcon />}
          </div>
        ) : null}
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
        {phase === 3 && submitting ? (
          <Loading type='Oval' color='#03A9F4' width={50} height={50} />
        ) : phase === 3 && !submitting ? (
          <Button text='Sign up' design='filled' type='submit' />
        ) : null}
      </form>

      {/* bottom disclaimer */}
      <p className={styles.disclaimer}>
        Note: creating an account does not apply to the real Twitter, this is just a clone for my
        portfolio. Data used for this clone will not be shared, and is stored securely.
      </p>
    </Modal>
  );
}
