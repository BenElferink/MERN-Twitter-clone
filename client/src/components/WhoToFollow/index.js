import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import axios from '../../api';
import Loading from '../Loading';
import ProfilePicture from '../ProfilePicture';
import styles from './index.module.css';

export default function WhoToFollow() {
  const { id, following } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get('/twitter/users');
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

  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();
  const handleFollowClicked = async (userId) => {
    try {
      setRequesting(userId);
      const response = await axios.post('/twitter/follow/' + userId);
      console.log(`✅ ${response.status} ${response.statusText}`);
      dispatch(login(response.data.user));
      setRequesting(false);
    } catch (error) {
      console.error('❌', error);
      setRequesting(false);
    }
  };

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
                {requesting === user._id ? (
                  <Loading width='69px' size={20} />
                ) : (
                  <button onClick={() => handleFollowClicked(user._id)} disabled={requesting}>
                    {following.find((item) => item === user._id) ? 'Unfollow' : '+Follow'}
                  </button>
                )}
              </div>
            ),
        )
      )}
    </div>
  );
}
