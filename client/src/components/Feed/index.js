import PostTweet from '../PostTweet';
import Tweet from '../Tweet';
import styles from './index.module.css';

export default function Feed({ selectedNav }) {
  return (
    <div className={styles.component}>
      <div className={styles.title}>{selectedNav}</div>

      {/* post tweet */}
      <PostTweet />

      {/* view tweets */}
      <Tweet />
    </div>
  );
}
