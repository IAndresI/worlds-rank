import styles from './layout.module.scss';
import Head from 'next/head';
import Header from '../header';

const Layout = ({children, title="World Rank"}) => {
  return (
    <div className={styles.wrapper}>
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
        IAndresI
      </footer>
    </div>
  );
};

export default Layout;