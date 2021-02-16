import TwitterIcon from '../../icons/Twitter';
import Button from '../Button';
import ProfilePicture from '../ProfilePicture';
import Home from '../../icons/Home';
import Hashtag from '../../icons/Hashtag';
import Bell from '../../icons/Bell';
import Mail from '../../icons/Mail';
import User from '../../icons/User';
import styles from './index.module.css';

export default function Navbar({ navState }) {
  return (
    <div className={styles.component}>
      <nav>
        <TwitterIcon />
        <NavItem title='Home' Icon={Home} navState={navState} />
        <NavItem title='Explore' Icon={Hashtag} navState={navState} />
        <NavItem title='Notifications' Icon={Bell} navState={navState} />
        <NavItem title='Messages' Icon={Mail} navState={navState} />
        <NavItem title='Profile' Icon={User} navState={navState} />
        <Button text={'Tweet'} design='filled' />
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
