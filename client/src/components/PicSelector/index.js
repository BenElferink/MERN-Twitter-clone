import CameraIcon from '../../icons/Camera';
import { url } from '../../api';

export default function PicSelector({ pic, setPic }) {
  const baseStyles = {
      width: '200px',
      height: '200px',
      margin: '0 calc(50% - 100px)',
      background: `url("${url}/images/user.jpg")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '123%',
      backgroundPosition: 'center',
      border: '1px solid var(--twitterBlue)',
      borderRadius: '100%',
      display: 'grid',
      placeItems: 'center',
      position: 'relative',
    },
    selectorStyles = {
      opacity: '0',
      width: '100%',
      height: '100%',
      borderRadius: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '1',
      cursor: 'pointer',
      overflow: 'hidden',
    };

  const handleImage = (e) => {
    // get the files
    const allFiles = e.target.files;
    const file = allFiles[0];

    // Make new FileReader
    const reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + ' kB',
        base64: reader.result,
        file: file,
      };

      // Set it to the state
      setPic(fileInfo);
    };
  };

  return (
    <div style={baseStyles}>
      <input type='file' style={selectorStyles} onChange={handleImage} />

      {pic ? (
        <img
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '100%',
          }}
          src={pic.base64}
          alt=''
        />
      ) : (
        <CameraIcon
          style={{
            width: '30px',
            height: '30px',
            fill: '#333',
          }}
        />
      )}
    </div>
  );
}
