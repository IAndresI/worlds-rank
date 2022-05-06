import styles from './layout.module.scss';
import Head from 'next/head';
import Header from '../header';

const Layout = ({children, title="World Rank", openFilter}) => {
  return (
    <div className={`${styles.wrapper} ${openFilter ? styles.scrollDisabled : ''}`}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="./favicon.ico"/>
      </Head>
      <div className={styles.content}>
        <Header/>
        <main className={styles.main}>
          {children}
        </main>
      </div>
      <footer className={styles.footer}>
        Dreymandinn
      </footer>
    </div>
  );
};

export default Layout;