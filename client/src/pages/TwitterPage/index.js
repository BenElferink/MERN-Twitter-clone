import Navbar from '../../components/Navbar';
import Feed from '../../components/Feed';
import FeedSuggestions from '../../components/FeedSuggestions';
import styles from './index.module.css';
import { useState } from 'react';

export default function TwitterPage() {
  const [selectedNav, setSelectedNav] = useState('Home');

  return (
    <div className={styles.page}>
      {/* sidebar/navbar */}
      <Navbar navState={{ selectedNav, setSelectedNav }} />

      {/* tweets/feed */}
      <Feed selectedNav={selectedNav} />

      {/* search and other */}
      <FeedSuggestions />
    </div>
  );
}
