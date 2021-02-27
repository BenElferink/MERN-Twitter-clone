import { useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import Navbar from '../../components/Navbar';
import Feed from '../../components/Feed';
import FeedSuggestions from '../../components/FeedSuggestions';
import PosTweetModal from '../../components/PostTweetModal';

export default function TwitterPage() {
  const [selectedNav, setSelectedNav] = useState('Home');
  const [tweetModal, setTweetModal] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 992px)'),
    isLargeDesktop = useMediaQuery('(min-width: 1200px)'),
    pageStyles = {
      maxHeight: '100vh',
      maxWidth: isLargeDesktop ? '1200px' : isDesktop ? '992px' : '650px',
      margin: '0 auto',
      display: 'flex',
    };

  return (
    <div style={pageStyles}>
      {/* sidebar/navbar */}
      <Navbar
        navState={{ selectedNav, setSelectedNav }}
        openTweetModal={() => setTweetModal(true)}
      />

      {/* tweets/feed */}
      <Feed selectedNav={selectedNav} />

      {/* search and other */}
      <FeedSuggestions />

      {tweetModal && <PosTweetModal closeModal={() => setTweetModal(false)} />}
    </div>
  );
}
