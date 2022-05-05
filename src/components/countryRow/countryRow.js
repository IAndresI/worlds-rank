import React from 'react';
import styles from './countryRow.module.scss';
import Link from 'next/Link';

const CountryRow = ({name, flag, area, gini, population, id}) => {

  const giniYear = gini ? Object.keys(gini) : 'No data';

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
                  <progress className={styles.progress} max="100" value={gini[giniYear[0]]}></progress>
                  <div className={styles.counter}>{Math.round(gini[giniYear[0]])}%<span>(From {giniYear[0]})</span></div>
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