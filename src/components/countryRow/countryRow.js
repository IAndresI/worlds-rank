import React from 'react';
import styles from './countryRow.module.scss';
import Link from 'next/Link';

const CountryRow = ({name, flag, area, gini, population, id}) => {
  return (
    <Link href={`/country/${id}`}>
      <a className={styles.link}>
        <div className={styles.row}>
          <div className={styles.column__left}>
            <img src={flag} alt="flag" className={styles.flag}/>
            <span>{name}</span>
          </div>
          <div className={styles.column}>
            {population}
          </div>
          <div className={styles.column}>
            {area ? area : "No data"}
          </div>
          <div className={styles.column}>
            {
              gini ? (
                <>
                  <progress className={styles.progress} max="100" value={gini}></progress>
                  <span className={styles.counter}>{Math.round(gini)}%</span>
                </>
              ) : "No data"
            }
          </div>
        </div>
      </a>
    </Link>
    
  );
};

export default CountryRow;