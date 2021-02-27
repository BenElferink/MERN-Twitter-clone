export default function Footer() {
  const styles = {
    width: '100vw',
    padding: '15px 10px',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#818181',
    fontSize: '0.9em',
  };

  return (
    <div style={styles}>
      Developed by Ben Elferink - not a Twitter product - view source code&nbsp;
      <a
        href='https://github.com/belferink1996/MERN-Twitter-clone'
        target='_blank'
        rel='noreferrer'>
        here
      </a>
    </div>
  );
}
