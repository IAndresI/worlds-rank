import styles from './layout.module.scss';
import Head from 'next/head';
import Header from '../header';

const Layout = ({children, title="World Rank"}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="./favicon.ico"/>
      </Head>
      <Header/>
      <main>
        {children}
      </main>
      <footer className={styles.footer}>
        IAndresI
      </footer>
    </>
  );
};

export default Layout;