import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../api';
import Loading from '../Loading';
import ProfilePicture from '../ProfilePicture';
import styles from './index.module.css';

export default function WhoToFollow() {
  const { id } = useSelector((state) => state.user);
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
        users.map(
          (user) =>
            user._id !== id && (
              <div key={user._id} className={styles.listItem}>
                <ProfilePicture image={user.profilePicture} size='42px' />
                <p>@{user.username}</p>
                <button onClick={() => null}>+Follow</button>
              </div>
            ),
        )
      )}
    </div>
  );
}
