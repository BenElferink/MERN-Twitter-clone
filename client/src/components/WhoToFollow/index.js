import { useEffect, useState } from 'react';
import axios from '../../api';
import Loading from '../Loading';
import styles from './index.module.css';

export default function WhoToFollow() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get('/users');
        console.log(`✅ ${response.status} ${response.statusText}`);
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('❌', error);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.list}>
      {loading ? (
        <Loading />
      ) : (
        users.map((user) => (
          <div key={user._id} className={styles.listItem}>
            <img src={user.profilePicture || 'http://localhost:8080/images/user.jpg'} alt='' />
            <p>@{user.username}</p>
            <button onClick={() => null}>+Follow</button>
          </div>
        ))
      )}
    </div>
  );
}
