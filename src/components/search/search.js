import React from 'react';
import styles from './search.module.scss';

const Saerch = ({countriesCount, setSearch}) => {
  return (
    <section className={styles.search}>
      <div className="container">
        <div className={styles.inner}>
          <h2 className={styles.counter}>
            Found <span>{countriesCount}</span> countries
          </h2>
          <form className={styles.form} onSubmit={(e) => {e.preventDefault()}}>
            <input 
              placeholder="Filter by Name, Region, Subregion" 
              type="search" 
              onChange={(e) => {setSearch(e.target.value.toLocaleLowerCase())}} 
              className={styles.input}/>
            <button type="submit" className={styles.submit} />
          </form>
        </div>
      </div>
    </section>
   
  );
};

export default Saerch;