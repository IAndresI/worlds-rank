import React, {useState, useEffect} from 'react';
import styles from './header.module.scss';
import NextLink from 'next/link';

const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    setDarkTheme(localStorage.getItem("dark-theme") === "false" ? false : true);
  }, [])

  return (
    <header className={styles.header}>
      <NextLink href="/">
        <a>
          <h1 className={styles.header__logo}>
            World <span className={styles.header__green}>Ranks</span>
            <span className={styles.header__image}></span>
          </h1>
        </a>
      </NextLink>
      <button onClick={() => {
        localStorage.setItem("dark-theme", localStorage.getItem("dark-theme") === "false" ? "true" : "false");
        if(localStorage.getItem("dark-theme") === "false" ? true : false) document.documentElement.setAttribute("data-theme", "light")
        else document.documentElement.setAttribute("data-theme", "dark")
        setDarkTheme(localStorage.getItem("dark-theme") === "false" ? false : true);
      }} className={styles.theme}>
        {darkTheme ? <i className={styles.themeLight}/> : <i className={styles.themeDark}/>}
      </button>
    </header>
  );
};

export default Header;