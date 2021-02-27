import { useHistory } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import TwitterIcon from '../../icons/Twitter';
import LoginForm from '../LoginForm';
import Button from '../Button';

export default function AuthSelection({ clickRegister }) {
  const history = useHistory();

  const isTablet = useMediaQuery('(min-width: 768px)'),
    isDesktop = useMediaQuery('(min-width: 992px)'),
    isLargeDesktop = useMediaQuery('(min-width: 1200px)'),
    sectionStyles = {
      width: isLargeDesktop ? '45%' : isDesktop ? '60%' : '100%',
      height: isDesktop && '96vh',
      padding: isDesktop && '0.5em 1em',
    },
    mainStyles = {
      maxWidth: '650px',
      width: '100%',
      height: '480px',
      margin: isDesktop ? '13vh auto 0 0' : '2vh auto',
      padding: '2em 1.5em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    buttonsStyles = {
      width: isDesktop && '75%',
      display: 'flex',
      flexDirection: isDesktop ? 'column' : isTablet ? 'row' : 'column',
    };

  return (
    <div style={sectionStyles}>
      <LoginForm onPage='public' />

      <div style={mainStyles}>
        <TwitterIcon style={{ width: '50px', height: '50px' }} />
        <h1 style={{ fontSize: '3em' }}>Happening now</h1>
        <h2 style={{ fontSize: '2em' }}>Join Twitter today.</h2>
        <div style={buttonsStyles}>
          <Button text='Sign up' design='filled' onClick={clickRegister} />
          <Button text='Log in' design='outlined' onClick={() => history.push('/login')} />
        </div>
      </div>
    </div>
  );
}
