import useMediaQuery from '../../hooks/useMediaQuery';
import TwitterIcon from '../../icons/Twitter';
import { url } from '../../api';

export default function Banner() {
  const isDesktop = useMediaQuery('(min-width: 992px)'),
    isLargeDesktop = useMediaQuery('(min-width: 1200px)'),
    bannerStyles = {
      width: isLargeDesktop ? '55%' : isDesktop ? '40%' : '100%',
      height: isDesktop ? '96vh' : '55vh',
      background: `url('${url}/images/banner.png')`,
      backgroundColor: 'var(--twitterBlue)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      display: 'grid',
      placeItems: 'center',
    },
    iconStyles = {
      width: isDesktop ? '300px' : '200px',
      height: isDesktop ? '300px' : '200px',
      fill: '#fff',
    };

  return (
    <div style={bannerStyles}>
      <TwitterIcon style={iconStyles} />
    </div>
  );
}
