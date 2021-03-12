import React from 'react';
import styles from './countryRow.module.scss';

const CountryRow = ({name, flag, area, gini, population}) => {
  return (
    <div className={styles.row}>
      <div className={styles.column__left}>
        <img src={flag} alt="flag" className={styles.flag}/>
        <span>{name}</span>
      </div>
      <div className={styles.column}>
        {population}
      </div>
      <div className={styles.column}>
        {area}
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
  );
};

export default CountryRow;