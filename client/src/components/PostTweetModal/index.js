import Modal from '../Modal';
import BackIcon from '../../icons/Back';
import PostTweet from '../PostTweet';
import IconButton from '../IconButton';

export default function PosTweetModal({ closeModal }) {
  return (
    <Modal>
      <IconButton onClick={closeModal}>
        <BackIcon
          style={{
            width: '20px',
            height: '20px',
            fill: 'var(--twitterBlue)',
          }}
        />
      </IconButton>
      <PostTweet />
    </Modal>
  );
}
