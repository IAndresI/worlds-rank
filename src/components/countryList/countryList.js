import React, {useState, useEffect} from 'react';
import CountryRow from '../countryRow';
import styles from './countryList.module.scss';
import Pagination from '../pagination';

const CountryList = ({countries, setOpenFilter}) => {
  const [filterBy, setFilterBy] = useState("default");
  const [orderBy, setOrderBy] = useState("");
  const [allCountries, setAllCountries] = useState(null)
  const [countriesCount, setCountriesCount] = useState(0)
  const [page, setPage] = useState(0)
  const [countryPerPage] = useState(10)

  useEffect(() => {
    order();
  },[filterBy, orderBy, page, countries])

  function specialFilter(list, orderNumber) {
    switch (filterBy) {
      case 'name':
        return list.sort((a, b) => b.name.common > a.name.common ? orderNumber : -orderNumber);
      case 'gini':
        return list.sort((a, b) => {
          if (!a.gini) return orderNumber;
          if (!b.gini) return -orderNumber;
          const [giniYearA] = Object.keys(a.gini);
          const [giniYearB] = Object.keys(b.gini);
          return b.gini[giniYearB] > a.gini[giniYearA] ? orderNumber : -orderNumber;
        });
      default:
        return list.sort((a, b) => b[filterBy] > a[filterBy] ? orderNumber : -orderNumber);;
    }
  }

  function order() {
    let sortedCountries;
    let countriesList = [...countries];
    switch(orderBy) {
      case "": 
        sortedCountries = countriesList;
        break;
      case "asc":
        sortedCountries = specialFilter(countriesList, 1);
        break;
      case "desc": 
        sortedCountries = specialFilter(countriesList, -1);
        break;
      default: sortedCountries = countriesList;
    }
    setAllCountries(sortedCountries.map(e => (
          <CountryRow
            key={e.cca2}
            id={e.cca2}
            name={e.name.common} 
            population={e.population} 
            gini={e.gini} 
            area={e.area}
            flag={e.flags.png}
          />
        )
      ).slice(page*countryPerPage, (page*countryPerPage) + countryPerPage)
    )
    setCountriesCount(sortedCountries.length);
  }

  function setFilter(filterName) {
    if(filterName === filterBy) {
      switch(orderBy) {
        case "":
          setOrderBy("asc");
          break;
        case "asc":
          setOrderBy("desc");
          break;
        case "desc":
          setOrderBy("");
          break;
      }
    }
    else {
      setFilterBy(filterName);
      setOrderBy("asc");
    }
  }

  function setArrow(orderName) {
    return `
      ${styles.arrow}
      ${(filterBy === orderName && orderBy==="asc") ? styles.arrowTop : 
      (filterBy === orderName && orderBy==="desc") ? styles.arrowDown : null}
    `
  }

  return (
    <section>
      <div className="container">
        <button 
          className={styles.sideBarOpenBtn}
          onClick={() => setOpenFilter(true)}
        >
          Other filtres
        </button>
        {
          countries.length ?
          (
            <>
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
                allCountries
              }
              <Pagination itemsPerPage={countryPerPage} itemsCount={countriesCount} setPage={setPage} currentPage={page} />
            </>
          )
          :
          <h2 className={styles.nothingFound}>Nothing found</h2>
        }
      </div>
    </section>
  );
};

export default CountryList;