import Loader from 'react-loader-spinner';
// https://www.npmjs.com/package/react-loader-spinner
// TYPES:
// - Audio
// - BallTriangle
// - Bars
// - Circles
// - Grid
// - Hearts
// - Oval
// - Puff
// - Rings
// - TailSpin
// - ThreeDots

export default function Loading({ width, height, size }) {
  const wrapperStyles = {
    width: width || '100%',
    height: height || 'unset',
    display: 'grid',
    placeItems: 'center',
  };

  return (
    <div style={wrapperStyles}>
      <Loader type='Oval' color='#03A9F4' width={size || 50} height={size || 50} />
    </div>
  );
}
