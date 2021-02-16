import { useRef, useState } from 'react';
import axios from '../../api';
import Button from '../Button';
import ProfilePicture from '../ProfilePicture';
import ImageIcon from '../../icons/Image';
import EmojiIcon from '../../icons/Emoji';
import styles from './index.module.css';
import Loading from '../Loading';

export default function PostTweet({ addTweet }) {
  const [submitting, setSubmitting] = useState(false);
  const [tweetText, setTweetText] = useState('');
  const tweetTextRef = useRef();

  const resizeTextarea = () => {
    tweetTextRef.current.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    tweetTextRef.current.style.cssText = '-moz-box-sizing:content-box';
    tweetTextRef.current.style.cssText = 'height:' + tweetTextRef.current.scrollHeight + 'px';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = {
      message: tweetText,
      image: null,
    };

    try {
      const response = await axios.post('/twitter/tweet', formData);
      console.log(`✅ ${response.status} ${response.statusText}`);
      console.log(response.data);
      addTweet(response.data.tweet);
      setTweetText('');
    } catch (error) {
      console.error('❌', error);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.box}>
      <ProfilePicture isLoggedUser={true} />

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* char limit 280 */}
        <textarea
          placeholder="What's happening?"
          rows='1'
          ref={tweetTextRef}
          value={tweetText}
          onChange={(e) => {
            setTweetText(e.target.value);
            resizeTextarea();
          }}
        />

        <div className={styles.tools} onClick={() => null}>
          <div className={styles.formOption}>
            <ImageIcon />
          </div>
          <div className={styles.formOption} onClick={() => null}>
            <EmojiIcon />
          </div>
          {submitting ? (
            <Loading size={30} />
          ) : (
            <Button text='Tweet' design='filled' type='submit' disabled={!tweetText} />
          )}
        </div>
      </form>
    </div>
  );
}
