import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api';
import Loading from '../Loading';
import PostTweet from '../PostTweet';
import Tweet from '../Tweet';

export default function Feed({ selectedNav }) {
  const { token } = useSelector((state) => state.user);
  const [fetching, setFetching] = useState(false);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      setFetching(true);
      try {
        const response = await axios.get('/twitter/tweets', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
        console.log(`✅ ${response.status} ${response.statusText}`);
        setTweets(response.data.tweets);
        setFetching(false);
      } catch (error) {
        console.error('❌', error);
        setFetching(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const componentStyles = {
      flex: '1',
      border: '0.5px solid #f5f5f5',
    },
    titleStyles = {
      padding: '0.7em',
      fontSize: '1.2em',
      fontWeight: '900',
    };

  return (
    <div style={componentStyles}>
      <div style={titleStyles}>{selectedNav}</div>

      {selectedNav === 'Home' ? (
        <Fragment>
          {/* post tweet */}
          <PostTweet addTweet={(tweet) => setTweets([tweet, ...tweets])} />

          {/* tweets feed */}
          <div style={{ overflow: 'scroll', height: 'calc(100vh - 160px)' }}>
            {fetching ? <Loading /> : tweets.map((item) => <Tweet key={item._id} tweet={item} />)}
          </div>
        </Fragment>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          LOL nice try! 😂
          <br />
          Just head over to{' '}
          <a href='https://twitter.com' target='_blank' rel='noreferrer'>
            https://twitter.com
          </a>
        </div>
      )}
    </div>
  );
}
