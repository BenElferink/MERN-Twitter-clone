import useMediaQuery from '../../hooks/useMediaQuery';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import AuthSelection from '../../components/AuthSelection';

export default function PublicPage({ clickRegister }) {
  const isDesktop = useMediaQuery('(min-width: 992px)'),
    pageStyles = {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: isDesktop ? 'row-reverse' : 'column',
      flexWrap: isDesktop ? 'wrap' : 'nowrap',
      alignItems: 'center',
    };

  return (
    <div style={pageStyles}>
      <AuthSelection clickRegister={clickRegister} />
      <Banner />
      <Footer />
    </div>
  );
}
