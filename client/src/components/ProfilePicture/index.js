import { useSelector } from 'react-redux';

export default function ProfilePicture({ isLoggedUser, image, size }) {
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
        src={profilePicture || 'http://localhost:8080/images/user.jpg'}
        alt='👤'
        style={imgStyle}
      />
    );
  } else {
    return <img src={image || 'http://localhost:8080/images/user.jpg'} alt='👤' style={imgStyle} />;
  }
}
