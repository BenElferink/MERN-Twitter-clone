import { Fragment, useState } from 'react';
import styles from './index.module.css';
import FileBase64 from 'react-file-base64';
import Modal from '../../layout/Modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import TwitterIcon from '../../icons/Twitter';
import BackIcon from '../../icons/Back';
import AvatarIcon from '../../icons/Avatar';

export default function RegisterModal() {
  const [phase, setPhase] = useState(1);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const None = () => <div style={{ width: '70px' }} />;

  return (
    <Modal>
      <form className={styles.main} onSubmit={handleSubmit}>
        {/* top nav */}
        <div className={styles.nav}>
          {phase !== 1 ? (
            <button className={styles.back} onClick={() => setPhase(phase - 1)}>
              <BackIcon />
            </button>
          ) : (
            <None />
          )}
          <TwitterIcon />
          {phase === 2 && profilePic === '' ? (
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
        {phase === 1 || 3 ? (
          <h2>Create your account</h2>
        ) : phase === 2 ? (
          <h2>Pick a profile picture</h2>
        ) : null}

        {/* phase contents */}
        {phase === 2 || phase === 3 ? (
          <button className={styles.picSelect}>
            <FileBase64 multiple={false} onDone={(file) => setProfilePic(file)} />
            {profilePic === '' ? <AvatarIcon /> : <img src={profilePic.base64} alt='' />}
          </button>
        ) : null}
        {phase === 1 || phase === 3 ? (
          <Input
            label='Name'
            name='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : null}
        {phase === 3 && (
          <Input
            label='Username'
            name='username'
            type='text'
            value={username || name.replaceAll(' ', '')}
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
        {phase === 3 && <Button text='Sign up' design='filled' type='submit' />}
      </form>

      {/* bottom disclaimer */}
      <p className={styles.disclaimer}>
        Note: creating an account does not apply to the real Twitter, this is just a clone for my
        portfolio. Data used for this clone will not be shared, and is stored securely.
      </p>
    </Modal>
  );
}
