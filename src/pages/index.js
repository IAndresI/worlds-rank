import Layout from '../components/layout';
import Search from '../components/search';
import wolrdsRankService from '../api/index';
import CountryList from '../components/countryList';

export default function Home({countries}) {
  return (
    <Layout>
      <Search countriesCount={countries.length}/>
      <CountryList countries={countries}/>
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
