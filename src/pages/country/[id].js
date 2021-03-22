import styles from './country.module.scss';
import Layout from '../../components/layout';
import WolrdsRankService from '../../api';
import Link from 'next/Link';

const Row = ({name, description}) => (
  <div className={styles.row}>
    <span className={styles.descriptionName}>{name}</span>
    {
      name === "Gini" ? 
        description ? (
          <div className={styles.gini}>
            <progress className={styles.progress} max="100" value={description}></progress>
            <span className={styles.counter}>{Math.round(description)}%</span>
          </div>
        ) : "No data"
      :
        <span>{Array.isArray(description) ? description[0]["name"] : (description ? description : "No Data")}</span>
    }
  </div>
)

function setNeighbourCountries(data) {
  return data ? 
  (
    data.map(e => (
    <Link key={e.alpha3Code} href={`/country/${e.alpha3Code}`}>
      <a className={styles.neighbourLink}>
        <li key={e.alpha3Code} className={styles.item}>
          <div className={styles.neighbourFlagContainer}>
            <img src={e.flag} className={styles.neighbourFlag} alt="flag" />
          </div>
          <div className={styles.neighbourName}>{e.name}</div>
        </li>
      </a>
    </Link>
  ))
  )
  :
  "This country has no neighbouring countries"
}

const Country = ({country, neighbourCountries}) => {
  return (
    <Layout title={country.name}>
      <section>
        <div className="container">
          <div className={styles.inner}>
            <div className={styles.smallContainer}>
              <div className={styles.imageContainer}>
                <img className={styles.image} src={country.flag} alt="flag"/>
              </div>
              <h2 className={styles.name}>
                {country.name}
              </h2>
              <div className={styles.region}>{country.region}</div>
              <div className={styles.miniInfoContainer}>
                <div className={styles.miniInfo}>
                  <div className={styles.description}>{country.population ? country.population : "No Data"}</div>
                  <div className={styles.descriptionName}>Population</div>
                </div>
                <div className={styles.miniInfo}>
                  <div className={styles.description}>{country.area ? country.area : "No Data"}</div>
                  <div className={styles.descriptionName}>Area (km)</div>
                </div>
              </div>
            </div>  
            <div className={styles.bigContainer}>
              <div className={styles.details}>Details</div>
              <div className={styles.descriptionContainer}>
                <Row name="Capital" description={country.capital}/>
                <Row name="Subregion" description={country.subregion}/>
                <Row name="Languages" description={country.languages}/>
                <Row name="Currencies" description={country.currencies}/>
                <Row name="Native name" description={country.nativeName}/>
                <Row name="Gini" description={country.gini}/>
              </div>
              <div className={styles.neighbourContainer}>
                <h2 className={styles.neighbourTitle}>Neighbouring Countries </h2>
                <ul className={styles.list}>
                  {setNeighbourCountries(neighbourCountries)}
                </ul>
              </div>
            </div>  
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps = async ({params}) => {
  const country = await WolrdsRankService.getCountry(params.id);
  const neighbourCountries = country.borders.length > 0 ? await WolrdsRankService.getCountry(`?codes=${country.borders.join(";")}`) : null;

  return {
    props: {
      country,
      neighbourCountries
    }
  }
}

export default Country;
