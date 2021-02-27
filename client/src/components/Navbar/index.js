import { useEffect, useState } from 'react';
import Button from '../Button';
import ProfilePicture from '../ProfilePicture';
import Home from '../../icons/Home';
import Hashtag from '../../icons/Hashtag';
import Bell from '../../icons/Bell';
import Mail from '../../icons/Mail';
import User from '../../icons/User';
import TwitterIcon from '../../icons/Twitter';
import NewTweetIcon from '../../icons/NewTweet';
import styles from './index.module.css';
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar({ navState, openTweetModal }) {
  const [view, setView] = useState(window.innerWidth);

  useEffect(() => {
    const handler = () => setView(window.innerWidth);
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return (
    <div className={styles.component}>
      <nav>
        <TwitterIcon />
        <NavItem title='Home' Icon={Home} navState={navState} />
        <NavItem title='Explore' Icon={Hashtag} navState={navState} />
        <NavItem title='Notifications' Icon={Bell} navState={navState} />
        <NavItem title='Messages' Icon={Mail} navState={navState} />
        <NavItem title='Profile' Icon={User} navState={navState} />
        <Button design='filled' onClick={openTweetModal}>
          {view >= 1200 ? 'Tweet' : <NewTweetIcon />}
        </Button>
      </nav>

      <UserChip />
    </div>
  );
}

function NavItem({ title, Icon, navState }) {
  return (
    <div
      className={`${styles.link} ${navState.selectedNav === title && styles.selected}`}
      onClick={() => navState.setSelectedNav(title)}>
      <Icon />
      <span>{title}</span>
    </div>
  );
}

function UserChip() {
  const { name, username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div
      className={styles.chip}
      onClick={async () => {
        if (window.confirm('Do you want to log out?')) {
          // await axios.get('/auth/logout');
          // window.location.reload();
          dispatch(logout());
        }
      }}>
      <ProfilePicture isLoggedUser={true} size='42px' />
      <div>
        <span>{name}</span>
        <p>@{username}</p>
      </div>
      <span>•••</span>
    </div>
  );
}
