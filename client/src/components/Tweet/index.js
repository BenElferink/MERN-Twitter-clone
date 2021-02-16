import ProfilePicture from '../ProfilePicture';
import styles from './index.module.css';

export default function Tweet() {
  return (
    <div className={styles.box}>
      <ProfilePicture />
      <div className={styles.boxMain}>
        <div>NAME @USERNAME • TIME AGO</div>
        <div>TWEET</div>
        <div className={styles.tools}>REPLY RETWEET LIKE</div>
      </div>
    </div>
  );
}
