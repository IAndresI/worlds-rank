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
  const [minMaxArea, setMinMaxArea] = useState({
    min: -1,
    max: 0
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

    setSubRegions(countriesSubRegions);
    setRegions(countriesRegions);

    // Area
    const areas = countries.map(country => +country.area);
    const [maxArea, minArea] = [Math.max(...areas), Math.min(...areas)]

    setMinMaxArea({
      min: minArea < 0 ? 0 : minArea,
      max: maxArea
    })


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

