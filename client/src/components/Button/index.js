import { useRef } from 'react';

export default function Button({ children, design, style, text, onClick, type, disabled }) {
  const ref = useRef(null);

  const btnStyles = {
      width: 'calc(100% - 10px)',
      height: '42px',
      margin: '5px',
      display: 'grid',
      placeItems: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '2rem',
      textAlign: 'center',
      fontSize: '1em',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'box-shadow 0.2s',
      opacity: disabled ? '0.4' : '1',
    },
    filled = {
      backgroundColor: 'var(--twitterBlue)',
      color: '#fff',
    },
    outlined = {
      border: '1px solid var(--twitterBlue)',
      color: 'var(--twitterBlue)',
    },
    doHoverStyles = () => {
      ref.current.style.boxShadow = '0 0 5rem 0.4rem rgba(0, 0, 0, 0.2) inset';
    },
    undoHoverStyles = () => {
      ref.current.style.boxShadow = 'none';
    };

  return (
    <button
      ref={ref}
      style={{ ...btnStyles, ...(design === 'outlined' ? outlined : filled), ...style }}
      onMouseEnter={doHoverStyles}
      onMouseLeave={undoHoverStyles}
      type={type ? type : ''}
      onClick={onClick ? onClick : () => null}
      disabled={disabled}>
      {children || text}
    </button>
  );
}
