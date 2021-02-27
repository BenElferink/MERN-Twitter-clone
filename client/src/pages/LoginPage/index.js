import TwitterIcon from '../../icons/Twitter';
import LoginForm from '../../components/LoginForm';

export default function LoginPage({ clickRegister }) {
  const pageStyles = {
      maxWidth: '420px',
      margin: '0 auto',
      padding: '2rem',
    },
    titleStyles = {
      marginTop: '42px',
    };

  return (
    <div style={pageStyles}>
      <TwitterIcon style={{ width: '50px', height: '50px' }} />
      <h2 style={titleStyles}>Log in to Twitter</h2>
      <LoginForm onPage='login' clickRegister={clickRegister} />
    </div>
  );
}
