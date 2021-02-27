import useMediaQuery from '../../hooks/useMediaQuery';

export default function Modal({ children, width, height, layout }) {
  const isNotMobile = useMediaQuery('(min-width: 768px)'),
    modalBgStyles = {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '999',
      display: 'grid',
      placeItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalStyles = {
      maxWidth: isNotMobile ? '600px' : '768px',
      width: width || '100%',
      height: isNotMobile ? height || 'fit-content' : '100vh',
      padding: '1em',
      backgroundColor: '#fff',
      borderRadius: isNotMobile && '1em',
    };

  return (
    <div style={modalBgStyles}>
      <div style={{ ...modalStyles, ...layout }}>{children}</div>
    </div>
  );
}
