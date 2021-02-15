import Loader from 'react-loader-spinner';
// https://www.npmjs.com/package/react-loader-spinner

export default function Loading({ height }) {
  return (
    <div
      style={{ width: '100%', height: height || 'unset', display: 'grid', placeItems: 'center' }}>
      <Loader type='Oval' color='#03A9F4' width={50} height={50} />
    </div>
  );
}

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
