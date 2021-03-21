import styles from './layout.module.scss';
import Head from 'next/head';
import Header from '../header';
import Link from 'next/Link';

const Layout = ({children, title="World Rank"}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="./favicon.ico"/>
      </Head>
      <Link href="/">
        <a>
        <Header/>
        </a>
      </Link>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        IAndresI
      </footer>
    </>
  );
};

export default Layout;