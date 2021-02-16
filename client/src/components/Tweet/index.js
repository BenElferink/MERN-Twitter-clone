import ProfilePicture from '../ProfilePicture';
import styles from './index.module.css';

export default function Tweet({ tweet }) {
  return (
    <div className={styles.box}>
      <ProfilePicture image={tweet.from.profilePicture} />

      <div>
        <div className={styles.head}>
          {tweet.from.name}{' '}
          <span>
            @{tweet.from.username} • {timeAgo(tweet.createdAt)}
          </span>
        </div>

        <div className={styles.tweet}>
          {tweet.message}
          {tweet.image && <img src={tweet.image} alt='tweet_image' />}
        </div>

        <div className={styles.tools}>
          <div>COMMENT {tweet.comments.length}</div>
          <div>RETWEET {tweet.retweets.length}</div>
          <div>LIKE {tweet.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

const timeAgo = (createdAt) => {
  const timeDifference = Date.now() - new Date(createdAt);
  const msTypes = [
    { ms: 3.154e10, symbol: 'y' }, // ms per year (approx)
    { ms: 2.628e9, symbol: 'mo' }, // ms per month
    { ms: 6.048e8, symbol: 'w' }, // ms per week
    { ms: 8.64e7, symbol: 'd' }, // ms per day
    { ms: 3.6e6, symbol: 'h' }, // ms per hour
    { ms: 60000, symbol: 'm' }, // ms per minute
    { ms: 1000, symbol: 's' }, // ms per second
    { ms: 1, symbol: 'ms' }, // ms
  ];

  for (let i = 0; i < msTypes.length; i++) {
    if (timeDifference >= msTypes[i].ms)
      return `${Math.floor(timeDifference / msTypes[i].ms)}${msTypes[i].symbol}`;
  }
};
