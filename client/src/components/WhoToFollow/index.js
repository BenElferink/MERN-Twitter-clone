import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import axios from '../../api';
import Loading from '../Loading';
import ProfilePicture from '../ProfilePicture';

export default function WhoToFollow({ height }) {
  const { id, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get('/twitter/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
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

  const listStyles = {
    width: '100%',
    height: height || '420px',
    overflow: 'scroll',
  };

  return (
    <div style={listStyles}>
      {loading ? (
        <Loading />
      ) : (
        users.map((user) => user._id !== id && <PersonToFollow key={user._id} user={user} />)
      )}
    </div>
  );
}

function PersonToFollow({ user }) {
  const [requesting, setRequesting] = useState(false);

  const listItemStyles = {
      padding: '7px',
      display: 'flex',
      alignItems: 'center',
    },
    tagStyles = {
      flex: '1',
      padding: '0 5px',
      fontWeight: '500',
    };

  return (
    <div key={user._id} style={listItemStyles}>
      {/* image */}
      <ProfilePicture image={user.profilePicture} size='42px' />

      {/* user @tag */}
      <p style={tagStyles}>@{user.username}</p>

      {/* handle API */}
      {requesting === user._id ? (
        <Loading width='69px' size={20} />
      ) : (
        <FollowButton user={user} setRequesting={setRequesting} />
      )}
    </div>
  );
}

function FollowButton({ user, setRequesting }) {
  const { following, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleFollowClicked = async (userId) => {
    try {
      setRequesting(userId);
      const response = await axios.post('/twitter/follow/' + userId, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(`✅ ${response.status} ${response.statusText}`);
      dispatch(login({ user: response.data.user, token }));
      setRequesting(false);
    } catch (error) {
      console.error('❌', error);
      setRequesting(false);
    }
  };

  const btnStyles = {
      padding: '4px 5px',
      backgroundColor: 'transparent',
      border: '1px solid var(--twitterBlue)',
      borderRadius: '7px',
      color: 'var(--twitterBlue)',
      fontSize: '0.9em',
      fontWeight: '600',
    },
    doHoverStyles = () => (ref.current.style.backgroundColor = 'rgba(50, 50, 100, 0.1)'),
    undoHoverStyles = () => (ref.current.style.backgroundColor = 'transparent');

  return (
    <button
      ref={ref}
      style={btnStyles}
      onMouseEnter={doHoverStyles}
      onMouseLeave={undoHoverStyles}
      onClick={() => handleFollowClicked(user._id)}>
      {following.find((item) => item === user._id) ? 'Unfollow' : '+Follow'}
    </button>
  );
}
