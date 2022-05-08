import React from 'react';
import styles from './countryRow.module.scss';
import NextLink from 'next/link';
import Image from 'next/image';


const CountryRow = ({name, flag, area, gini, population, id}) => {

  const giniYear = gini ? Object.keys(gini) : 'No data';

  return (
    <NextLink href={`/country/${id}`}>
      <a className={styles.link}>
        <div className={styles.row}>
          <div className={styles.column__left}>
            <div className={styles.flag}>
              <Image
                className={styles.flag}
                width={50} 
                height={37.7} 
                placeholder="blur"  
                src={flag}
                alt="flag"
              />
            </div>
            
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
    </NextLink>
    
  );
};

export default CountryRow;