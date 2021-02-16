import Navbar from '../../components/Navbar';
import Feed from '../../components/Feed';
import FeedSuggestions from '../../components/FeedSuggestions';

export default function TwitterPage() {
  return (
    <div style={pageStyle}>
      {/* sidebar/navbar */}
      <Navbar />

      {/* tweets/feed */}
      <Feed />

      {/* search and other */}
      <FeedSuggestions />
    </div>
  );
}

const pageStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
};
