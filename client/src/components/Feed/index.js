import { useEffect, useState } from 'react';
import axios from '../../api';
import Loading from '../Loading';
import PostTweet from '../PostTweet';
import Tweet from '../Tweet';
import styles from './index.module.css';

export default function Feed({ selectedNav }) {
  const [fetching, setFetching] = useState(false);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      setFetching(true);
      try {
        const response = await axios.get('/twitter/tweets');
        console.log(`✅ ${response.status} ${response.statusText}`);
        console.log(response.data);
        setTweets(response.data.tweets);
        setFetching(false);
      } catch (error) {
        console.error('❌', error);
        setFetching(false);
      }
    })();
  }, []);

  return (
    <div className={styles.component}>
      <div className={styles.title}>{selectedNav}</div>

      {/* post tweet */}
      <PostTweet addTweet={(tweet) => setTweets([tweet, ...tweets])} />

      {/* view tweets */}
      {fetching ? <Loading /> : tweets.map((item) => <Tweet key={item._id} tweet={item} />)}
    </div>
  );
}
