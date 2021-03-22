import React, {useState, useEffect} from 'react';
import styles from './header.module.scss';
import Link from 'next/Link';

const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if(darkTheme) document.documentElement.setAttribute("data-theme", "dark")
    else document.documentElement.setAttribute("data-theme", "light")
  }, [darkTheme])

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1 className={styles.header__logo}>
            World <span className={styles.header__green}>Ranks</span>
            <span className={styles.header__image}></span>
          </h1>
        </a>
      </Link>
      <button onClick={() => setDarkTheme(() => !darkTheme)} className={styles.theme}>
        {darkTheme ? <i className={styles.themeLight}/> : <i className={styles.themeDark}/>}
      </button>
    </header>
  );
};

export default Header;