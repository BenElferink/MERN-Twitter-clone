import styles from './index.module.css';
import Loader from 'react-loader-spinner';
// https://www.npmjs.com/package/react-loader-spinner

export default function Loading() {
  return (
    <div className={styles.component}>
      <Loader type='BallTriangle' color='#03A9F4' height={111} width={111} />
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
