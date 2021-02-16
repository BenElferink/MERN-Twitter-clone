import TwitterIcon from '../../icons/Twitter';
import Button from '../Button';
import ProfilePicture from '../ProfilePicture';
import Home from '../../icons/Home';
import Hashtag from '../../icons/Hashtag';
import Bell from '../../icons/Bell';
import Mail from '../../icons/Mail';
import User from '../../icons/User';
import styles from './index.module.css';

export default function Navbar() {
  return (
    <div className={styles.component}>
      <nav>
        <TwitterIcon />
        <NavItem title='Home' Icon={Home} />
        <NavItem title='Explore' Icon={Hashtag} />
        <NavItem title='Notifications' Icon={Bell} />
        <NavItem title='Messages' Icon={Mail} />
        <NavItem title='Profile' Icon={User} />
        <Button text={'Tweet'} design='filled' />
      </nav>

      <UserChip />
    </div>
  );
}

function NavItem({ title, Icon }) {
  return (
    <div className={styles.link}>
      <Icon />
      <span>{title}</span>
    </div>
  );
}

function UserChip() {
  return (
    <div className={styles.chip}>
      <ProfilePicture isLoggedUser={true} size='42px' />
      <div>
        <span>Name</span>
        <p>@username</p>
      </div>
      <span>•••</span>
    </div>
  );
}
