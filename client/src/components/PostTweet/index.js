import { useRef, useState } from 'react';
import Button from '../Button';
import ProfilePicture from '../ProfilePicture';
import ImageIcon from '../../icons/Image';
import EmojiIcon from '../../icons/Emoji';
import styles from './index.module.css';

export default function PostTweet() {
  const [tweetText, setTweetText] = useState('');
  const tweetTextRef = useRef();

  const resizeTextarea = () => {
    tweetTextRef.current.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    tweetTextRef.current.style.cssText = '-moz-box-sizing:content-box';
    tweetTextRef.current.style.cssText = 'height:' + tweetTextRef.current.scrollHeight + 'px';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <Button text='Tweet' design='filled' type='submit' disabled={!tweetText} />
        </div>
      </form>
    </div>
  );
}
