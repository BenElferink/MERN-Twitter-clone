import { useHistory } from 'react-router-dom';
import ProfilePicture from '../ProfilePicture';
import CommentIcon from '../../icons/Comment';
import ReTweetIcon from '../../icons/ReTweet';
import HeartIcon from '../../icons/Heart';
import styles from './index.module.css';

export default function Tweet({ tweet }) {
  const history = useHistory();

  return (
    <div className={styles.box}>
      <ProfilePicture image={tweet.from.profilePicture} />

      <div>
        <div className={styles.head} onClick={() => history.push('/profile/' + tweet.from._id)}>
          <span>{tweet.from.name}</span> @{tweet.from.username} • {timeAgo(tweet.createdAt)}
        </div>

        <div className={styles.tweet} onClick={() => history.push('/tweet/' + tweet._id)}>
          {tweet.message}
          {tweet.image && (
            <img
              src={tweet.image}
              alt='tweet_image'
              style={{ borderRadius: '10px', margin: '10px 0 0 0', width: '100%' }}
            />
          )}
        </div>

        <div className={styles.tools}>
          <div className={styles.comment}>
            <CommentIcon />
            {tweet.comments.length}
          </div>
          <div className={styles.retweet}>
            <ReTweetIcon />
            {tweet.retweets.length}
          </div>
          <div className={styles.like}>
            <HeartIcon />
            {tweet.likes.length}
          </div>
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
