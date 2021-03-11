import React from 'react';
import styles from './search.module.scss';

const Saerch = ({countriesCount}) => {
  return (
    <section className={styles.search}>
      <div className="container">
        <div className={styles.search__inner}>
          <h2 className={styles.search__counter}>
            Found <span>{countriesCount}</span> countries
          </h2>
          <form className={styles.search__form}>
            <input placeholder="Filter by Name, Region, Subregion" type="search" className={styles.search__input}/>
            <button type="submit" className={styles.search__submit}></button>
          </form>
        </div>
      </div>
    </section>
   
  );
};

export default Saerch;