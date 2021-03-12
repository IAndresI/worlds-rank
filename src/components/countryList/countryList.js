import React, {useState} from 'react';
import CountryRow from '../countryRow';
import styles from './countryList.module.scss';

const CountryList = ({countries}) => {
  const [orderBy, setOrderBy] = useState("default")


  function order() {
    let orderedCountries;
    let countriesList = [...countries];
    switch(orderBy) {
      case "name": 
        orderedCountries = countriesList.sort((a, b) => b.name > a.name ? 1 : -1);
        break;
      case "nameReverse": 
        orderedCountries = countriesList.sort((a, b) => b.name > a.name ? -1 : 1);
        break;
      case "area": 
        orderedCountries = countriesList.sort((a, b) => b.area > a.area ? 1 : -1);
        break;
      case "areaReverse": 
        orderedCountries = countriesList.sort((a, b) => a.area - b.area);
        break;
      case "population": 
      orderedCountries = countriesList.sort((a, b) => b.population > a.population ? 1 : -1);
        break;
      case "populationReverse": 
        orderedCountries = countriesList.sort((a, b) => a.population - b.population);
        break;
      case "gini": 
      orderedCountries = countriesList.sort((a, b) => b.gini > a.gini ? 1 : -1);
        break;
      case "giniReverse": 
        orderedCountries = countriesList.sort((a, b) => a.gini - b.gini);
        break;
      default: orderedCountries = countriesList;
    }
    return orderedCountries.map(e => (
      <CountryRow
        key={e.alpha3Code}
        name={e.name} 
        population={e.population} 
        gini={e.gini} 
        area={e.area}
        flag={e.flag}
      />)
    )
  }

  function setFilter(filterName) {
    switch(orderBy) {
      case filterName:
        setOrderBy(filterName+"Reverse")
        break;
      case filterName+"Reverse":
        setOrderBy("default");
        break;
      default: setOrderBy(filterName);
    }
  }

  return (
    <section>
      <div className="container">
        <div className={styles.header}>
          <button
            onClick={() => setFilter("name")}
            className={styles.header__item}>
              Name
              {
                (() => {
                  if(orderBy === "name") return <div className={styles.arrowDown}></div>
                  else if (orderBy === "nameReverse") return <div className={styles.arrowTop}></div>
                  return;
                })()
              }
          </button>
          <button 
            onClick={() => setFilter("population")}
            className={styles.header__item}>
              Population
              {
                (() => {
                  if(orderBy === "population") return <div className={styles.arrowDown}></div>
                  else if (orderBy === "populationReverse") return <div className={styles.arrowTop}></div>
                  return;
                })()
              }
            </button>
          <button 
            onClick={() => setFilter("area")}
            className={styles.header__item}>
              Area
              {
                (() => {
                  if(orderBy === "area") return <div className={styles.arrowDown}></div>
                  else if (orderBy === "areaReverse") return <div className={styles.arrowTop}></div>
                  return;
                })()
              }
            </button>
          <button 
            onClick={() => setFilter("gini")}
            className={styles.header__item}>
              Gini
              {
                (() => {
                  if(orderBy === "gini") return <div className={styles.arrowDown}></div>
                  else if (orderBy === "giniReverse") return <div className={styles.arrowTop}></div>
                  return;
                })()
              }  
            </button>
        </div>
        {order()}
      </div>
    </section>
  );
};

export default CountryList;