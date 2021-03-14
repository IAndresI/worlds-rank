import React, {useState} from 'react';
import CountryRow from '../countryRow';
import styles from './countryList.module.scss';

const CountryList = ({countries}) => {
  const [orderBy, setOrderBy] = useState("default");
  const [ordred, setOrdred] = useState("");


  function order() {
    let orderedCountries;
    let countriesList = [...countries];
    switch(ordred) {
      case "": 
        orderedCountries = countriesList;
        break;
      case "asc": 
        orderedCountries = countriesList.sort((a, b) => b[orderBy] > a[orderBy] ? 1 : -1);
        break;
      case "desc": 
        orderedCountries = countriesList.sort((a, b) => b[orderBy] > a[orderBy] ? -1 : 1);
        break;
      default: orderedCountries = countriesList;
    }
    return orderedCountries.map(e => (
        <CountryRow
          key={e.alpha3Code}
          id={e.alpha3Code}
          name={e.name} 
          population={e.population} 
          gini={e.gini} 
          area={e.area}
          flag={e.flag}
        />
      )
    )
  }

  function setFilter(filterName) {
    if(filterName === orderBy) {
      switch(ordred) {
        case "":
          setOrdred("asc");
          break;
        case "asc":
          setOrdred("desc");
          break;
        case "desc":
          setOrdred("");
          break;
      }
    }
    else {
      setOrderBy(filterName);
      setOrdred("asc");
    }
  }

  function setArrow(orderName) {
    return `
      ${styles.arrow}
      ${(orderBy === orderName && ordred==="asc") ? styles.arrowTop : 
      (orderBy === orderName && ordred==="desc") ? styles.arrowDown : null}
    `
  }

  return (
    <section>
      <div className="container">
        <div className={styles.header}>
          <button
            onClick={() => setFilter("name")}
            className={styles.header__item}>
              Name
              <i className={setArrow("name")} />
          </button>
          <button 
            onClick={() => setFilter("population")}
            className={styles.header__item}>
              Population
              <i className={setArrow("population")} />
            </button>
          <button 
            onClick={() => setFilter("area")}
            className={styles.header__item}>
              Area
              <i className={setArrow("area")} />
            </button>
          <button 
            onClick={() => setFilter("gini")}
            className={styles.header__item}>
              Gini
              <i className={setArrow("gini")} />
            </button>
        </div>
        {
          order()
        }
      </div>
    </section>
  );
};

export default CountryList;