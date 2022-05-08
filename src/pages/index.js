import {useState, useEffect} from 'react'
import Layout from '../components/layout';
import Search from '../components/search';
import wolrdsRankService from '../api/index';
import CountryList from '../components/countryList';
import FilterSideBar from '../components/filterSideBar';

export default function Home({countries}) {
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [filtredCountries, setFiltredCountries] = useState(countries)

  const [aviableFilterOptions, setAviableFilterOptions] = useState({
    regions: [],
    subRegions: [],
    continents: [],
    timezones: [],
    capitals: [],
    currencies: [],
    languages: [],
    minMaxArea: [0,1],
  })

  const [selectedOption, setSelectedOption] = useState({
    selectedMinMaxArea: [],
    selectedRegions: [],
    selectedSubregions: [],
    selectedContinents: [],
    selectedTimezones: [],
    selectedCapitals: [],
    selectedCurrencys: [],
    selectedLanguages: []
  })

  const normalizeSelectData = (data) => {
    return data.map(el => el.value);
  }

  useEffect(() => {
    let searched = countries.filter(e => {
      return e.name.common.toLowerCase().includes(search) || 
      e.region.toLowerCase().includes(search) || 
      e?.subregion?.toLowerCase().includes(search)
      }
    )
    for (const prop in selectedOption) {
      if (selectedOption[prop].length) {
        switch (prop) {
          case "selectedMinMaxArea":
            searched = searched.filter(country => country.area >= +selectedOption[prop][0] && country.area <= +selectedOption[prop][1]);
            break;
          case "selectedRegions":
            const reg = normalizeSelectData(selectedOption[prop])
            searched = searched.filter(country => reg.includes(country.region));
            break;
          case "selectedSubregions":
            const sub = normalizeSelectData(selectedOption[prop])
            searched = searched.filter(country => sub.includes(country.subregion));
            break;
          case "selectedContinents":
            const cont = normalizeSelectData(selectedOption[prop])
            searched = searched.filter(country => cont.includes(...country.continents));
            break;
          case "selectedTimezones":
            const timez = normalizeSelectData(selectedOption[prop])
            searched = searched.filter(country => timez.includes(...country.timezones));
            break;
          case "selectedCapitals":
            const cap = normalizeSelectData(selectedOption[prop])
            searched = searched.filter(country => country.capital ? cap.includes(...country.capital) : false);
            break;
          case "selectedCurrencys":
            const curr = normalizeSelectData(selectedOption[prop])
            searched = searched.filter(country => country.currencies ? Object.keys(country.currencies).some(key => curr.includes(key)) : false);
            break;
          case "selectedLanguages":
            const lan = normalizeSelectData(selectedOption[prop])
            searched = searched.filter(country => country.languages ? Object.keys(country.languages).some(key => lan.includes(key)) : false);
            break;
        }
      }
    }

    setFiltredCountries(searched);
    
  }, [selectedOption, search])

  useEffect(() => {

    // Regions
    const countriesRegions = [...new Set(countries.map(country => country.region))].sort();
    const countriesSubRegions = [...new Set(countries.map(country => country.subregion))].sort();

    setAviableFilterOptions((prev) => ({...prev, subRegions: countriesSubRegions.map(el => ({value: el, label: el}))}));
    setAviableFilterOptions((prev) => ({...prev, regions: countriesRegions.map(el => ({value: el, label: el}))}));

    // Area
    const areas = countries.map(country => +country.area);
    const [maxArea, minArea] = [Math.max(...areas), Math.min(...areas)]

    setAviableFilterOptions((prev) => ({...prev, minMaxArea: [minArea < 0 ? 0 : minArea, maxArea]}));

    // Continents

    const countriesContinents = [...new Set(countries.map(country => country.continents[0]))].sort();
    setAviableFilterOptions((prev) => ({...prev, continents: countriesContinents.map(el => ({value: el, label: el}))}));

    // Timezones

    let zones = [];
    zones.push({value: 'UTC', label: 'UTC'})
    for (let i = 1; i < 13; i++) {
      let positiveZone = `UTC+${i < 10 ? `0${i}` : i}:00`;
      let negativeZone = `UTC-${i < 10 ? `0${i}` : i}:00`;
      zones.push({value: positiveZone, label: positiveZone})
      zones.push({value: negativeZone, label: negativeZone})
    }
    setAviableFilterOptions((prev) => ({...prev, timezones: zones}));

    // Capitals

    const countriesCapitals = [...new Set(countries.map(country => country.capital ? country.capital[0] : null))].sort();
    setAviableFilterOptions((prev) => ({...prev, capitals: countriesCapitals.map(el => ({value: el, label: el}))}));

    // Currencies

    let curr = [];
    let unicCurr = [];
    countries.map(country => {
      if(!country.currencies) return
      const currArr = Object.keys(country.currencies);
      currArr.forEach(currEl => curr.push({
        value: currEl, 
        label: `${country.currencies[currEl].symbol ? country.currencies[currEl].symbol : ''} ${country.currencies[currEl].name}`
      }))
    })
    curr.forEach(el => {
      if(!unicCurr.some(e => e.value === el.value)) unicCurr.push(el);
    })

    unicCurr.sort((a,b) => a.label.localeCompare(b.label));
    setAviableFilterOptions((prev) => ({...prev, currencies: unicCurr}));

    // Language

    function getObjectValue(obj) {
      if(!obj)
        return;
      const objProps = Object.keys(obj);
      let arr = [];
      objProps.forEach(prop => {
        arr.push({value: prop, label: obj[prop]});
      })    
      return arr;
    }

    const languageList = [];
    let countriesLanguages = countries.map(country => country.languages);
    countriesLanguages.forEach(language => language ? languageList.push(...getObjectValue(language)) : null);
    countriesLanguages = [];
    for (let i = 0; i < languageList.length; i++) {
      if(countriesLanguages.some(el => el.value === languageList[i].value))
        continue;
      countriesLanguages.push(languageList[i])
    }
    countriesLanguages.sort((a,b) => a.label < b.label ? -1 : 1);
    setAviableFilterOptions((prev) => ({...prev, languages: countriesLanguages}));

  }, [])
  
  
  return (
    <Layout openFilter={openFilter}>
      <Search countriesCount={filtredCountries.length} setSearch={setSearch}/>
      <CountryList countries={filtredCountries} setOpenFilter={setOpenFilter}/>
      <FilterSideBar 
        openFilter={openFilter} 
        setOpenFilter={setOpenFilter}
        {...aviableFilterOptions}
        {...selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </Layout >
  )
}

export const getStaticProps = async() => {
  const countries = await wolrdsRankService.getAllCountries();
  return {
    props: {
      countries
    }
  }
} 

