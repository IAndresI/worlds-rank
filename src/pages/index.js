import Layout from '../components/layout';
import Search from '../components/search';
import wolrdsRankService from '../api/index';

export default function Home({countries}) {
  return (
    <Layout countries={countries}>
      <Search countriesCount={countries.length}/>
    </Layout>
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
