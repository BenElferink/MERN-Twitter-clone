import { useRef, useState } from 'react';
import axios from '../../api';
import Button from '../Button';
import Loading from '../Loading';
import ProfilePicture from '../ProfilePicture';
import IconButton from '../IconButton';
import ImageIcon from '../../icons/Image';
import EmojiIcon from '../../icons/Emoji';

export default function PostTweet({ addTweet }) {
  const [submitting, setSubmitting] = useState(false);
  const [tweetText, setTweetText] = useState('');
  const tweetTextRef = useRef();

  const handleSubmit = async (e) => {
    // e.preventDefault();
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

  const componentStyles = {
      display: 'flex',
      border: '0.5px solid #f5f5f5',
    },
    formStyles = {
      flex: '1',
      padding: '0 10px 10px 0',
    },
    textAreaStyles = {
      width: '100%',
      height: 'auto',
      margin: '15px 0',
      fontSize: '1.2em',
      backgroundColor: 'transparent',
      border: 'none',
      resize: 'none',
      overflow: 'hidden',
      outline: 'none',
    },
    toolStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    svgStyles = {
      width: '20px',
      height: '20px',
      fill: 'var(--twitterBlue)',
    };

  return (
    <div style={componentStyles}>
      <ProfilePicture isLoggedUser={true} style={{ margin: '10px' }} />

      <form style={formStyles} onSubmit={(e) => e.preventDefault()}>
        {/* char limit 280 */}
        <textarea
          ref={tweetTextRef}
          placeholder="What's happening?"
          rows='1'
          style={textAreaStyles}
          value={tweetText}
          onChange={(e) => {
            setTweetText(e.target.value);
            // The following auto-resizes the textarea to the number of rows typed
            tweetTextRef.current.style.height = 'auto';
            tweetTextRef.current.style.padding = '0';
            tweetTextRef.current.style.height = `${tweetTextRef.current.scrollHeight}px`;
          }}
        />

        <div style={toolStyles}>
          <IconButton onClick={() => null}>
            <ImageIcon style={svgStyles} />
          </IconButton>
          <IconButton onClick={() => null}>
            <EmojiIcon style={svgStyles} />
          </IconButton>

          {submitting ? (
            <Loading size={30} />
          ) : (
            <Button
              text='Tweet'
              design='filled'
              onClick={handleSubmit}
              disabled={!tweetText}
              style={{
                width: '70px',
                margin: '0 0 0 auto',
                lineHeight: '30px',
              }}
            />
          )}
        </div>
      </form>
    </div>
  );
}
