import { useSelector } from 'react-redux';
import { url } from '../../api';

export default function ProfilePicture({ isLoggedUser, image, size, style }) {
  const { profilePicture } = useSelector((state) => state.user);

  const imgStyle = {
    width: size || '50px',
    height: size || '50px',
    margin: '4px',
    borderRadius: '100%',
  };

  if (isLoggedUser) {
    return (
      <img
        src={profilePicture || `${url}/images/user.jpg`}
        alt='👤'
        style={{ ...imgStyle, ...style }}
      />
    );
  } else {
    return <img src={image || `${url}/images/user.jpg`} alt='👤' style={imgStyle} />;
  }
}
