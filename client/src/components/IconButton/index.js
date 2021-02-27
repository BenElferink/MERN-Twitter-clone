import React, { useRef } from 'react';

export default function IconButton({ children, onClick, type }) {
  const buttonRef = useRef(null),
    buttonStyles = {
      margin: '5px',
      padding: '5px',
      border: 'none',
      borderRadius: '100%',
      backgroundColor: 'transparent',
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
    };

  return (
    <button
      ref={buttonRef}
      style={buttonStyles}
      onMouseEnter={() => (buttonRef.current.style.backgroundColor = 'var(--twitterBlueSoft)')}
      onMouseLeave={() => (buttonRef.current.style.backgroundColor = 'transparent')}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
}
