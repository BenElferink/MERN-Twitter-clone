import useMediaQuery from '../../hooks/useMediaQuery';
import WhoToFollow from '../WhoToFollow';

export default function FeedSuggestions() {
  const isDesktop = useMediaQuery('(min-width: 992px)'),
    componentStyles = {
      display: isDesktop ? 'flex' : 'none',
      flexDirection: 'column',
      width: '300px',
    },
    titleStyles = {
      padding: '1em',
      fontWeight: '100',
      borderBottom: '1px solid #f5f5f5',
    },
    wrapperStyles = {
      height: '100%',
      overflow: 'scroll',
    };

  return (
    <div style={componentStyles}>
      <h6 style={titleStyles}>Who's on Twitter?</h6>
      <div style={wrapperStyles}>
        <WhoToFollow />
      </div>
    </div>
  );
}
