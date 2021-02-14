import styles from './index.module.css';

export default function Footer() {
  return (
    <div className={styles.component}>
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
