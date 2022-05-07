import {useState, useEffect} from 'react'
import Layout from '../components/layout';
import Search from '../components/search';
import wolrdsRankService from '../api/index';
import CountryList from '../components/countryList';
import FilterSideBar from '../components/filterSideBar';

export default function Home({countries}) {
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const [regions, setRegions] = useState([])
  const [subRegions, setSubRegions] = useState([])
  const [continents, setContinents] = useState([])
  const [timezones, setTimezones] = useState([])
  const [capitals, setCapitals] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [minMaxArea, setMinMaxArea] = useState({
    min: 0,
    max: 1
  })

  const searched = countries.filter(e => {
    return e.name.common.toLowerCase().includes(search) || 
    e.region.toLowerCase().includes(search) || 
    e?.subregion?.toLowerCase().includes(search)
    }
  )

  useEffect(() => {

    // Regions
    const countriesRegions = [...new Set(countries.map(country => country.region))].sort();
    const countriesSubRegions = [...new Set(countries.map(country => country.subregion))].sort();

    setSubRegions(countriesSubRegions.map(el => ({value: el, label: el})));
    setRegions(countriesRegions.map(el => ({value: el, label: el})));

    // Area
    const areas = countries.map(country => +country.area);
    const [maxArea, minArea] = [Math.max(...areas), Math.min(...areas)]

    setMinMaxArea({
      min: minArea < 0 ? 0 : minArea,
      max: maxArea
    })

    // Continents

    const countriesContinents = [...new Set(countries.map(country => country.continents[0]))].sort();
    setContinents(countriesContinents.map(el => ({value: el, label: el})))

    // Timezones

    let zones = [];
    zones.push({value: 'UTC', label: 'UTC'})
    for (let i = 1; i < 13; i++) {
      let positiveZone = `UTC+${i < 10 ? `0${i}` : i}:00`;
      let negativeZone = `UTC-${i < 10 ? `0${i}` : i}:00`;
      zones.push({value: positiveZone, label: positiveZone})
      zones.push({value: negativeZone, label: negativeZone})
    }
    setTimezones(zones);

    // Capitals

    const countriesCapitals = [...new Set(countries.map(country => country.capital ? country.capital[0] : null))].sort();
    setCapitals(countriesCapitals.map(el => ({value: el, label: el})))

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
    setCurrencies(unicCurr);

  }, [])
  
  
  return (
    <Layout openFilter={openFilter}>
      <Search countriesCount={searched.length} setSearch={setSearch}/>
      <CountryList countries={searched} setOpenFilter={setOpenFilter}/>
      <FilterSideBar 
        openFilter={openFilter} 
        setOpenFilter={setOpenFilter}
        regions={regions}
        subRegions={subRegions}
        minMaxArea={minMaxArea}
        timezones={timezones}
        capitals={capitals}
        currencies={currencies}
        continents={continents}
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

