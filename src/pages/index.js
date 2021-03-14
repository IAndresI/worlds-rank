import {useState} from 'react'
import Layout from '../components/layout';
import Search from '../components/search';
import wolrdsRankService from '../api/index';
import CountryList from '../components/countryList';

export default function Home({countries}) {
  const [search, setSearch] = useState("");

  const searched = countries.filter(e => 
    e.name.toLowerCase().includes(search) || 
    e.region.toLowerCase().includes(search) || 
    e.subregion.toLowerCase().includes(search)
  )

  return (
    <Layout>
      <Search countriesCount={countries.length} setSearch={setSearch}/>
      <CountryList countries={searched}/>
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
