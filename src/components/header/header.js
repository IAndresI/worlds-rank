import React from 'react';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>
        World <span className={styles.header__green}>Ranks</span>
        <span className={styles.header__image}></span>
      </h1>
    </header>
  );
};

export default Header;