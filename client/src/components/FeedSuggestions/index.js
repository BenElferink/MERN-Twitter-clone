import useMediaQuery from '../../hooks/useMediaQuery';
import WhoToFollow from '../WhoToFollow';

export default function FeedSuggestions() {
  const isDesktop = useMediaQuery('(min-width: 992px)'),
    componentStyles = {
      display: isDesktop ? 'flex' : 'none',
      flexDirection: 'column',
      width: '300px',
    };

  return (
    <div style={componentStyles}>
      SEARCH
      <div style={{ backgroundColor: '#808080' }}>
        <WhoToFollow />
      </div>
    </div>
  );
}
