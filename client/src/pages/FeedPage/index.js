import Navbar from '../../components/Navbar';

export default function FeedPage() {
  return (
    <div style={pageStyle}>
      {/* sidebar/navbar */}
      <Navbar />
      {/* tweets/feed */}
      FEED
      {/* search and other */}
      OTHER
    </div>
  );
}

const pageStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
};
