import Link from 'next/Link';
import styles from './404.module.scss';

const ErrorLink = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>
        Looks like u entered the wrong URL /\(0_0)/\
      </h2>
      <Link href="/">
        <a className={styles.link}>Back</a>
      </Link>
    </section>
  );
};

export default ErrorLink;