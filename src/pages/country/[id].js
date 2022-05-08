import styles from './country.module.scss';
import Layout from '../../components/layout';
import WolrdsRankService from '../../api';
import Link from 'next/Link';
import Image from 'next/image';

function getObjectValue(obj) {
  const objProps = Object.keys(obj);
  let str = '';
  if(typeof obj[objProps[0]] === 'object') {
    objProps.forEach(prop => {
      if(typeof obj[prop] === 'object') {
        str += getObjectValue(obj[prop])+"\r\n";
      }
      else {
        str += obj[prop];
      }
    });
  } else {
    const stringPropsArr = objProps.map(prop => {
      return obj[prop];
    })
    str += stringPropsArr.join(', ')
  }
  
  return str;
}

const Row = ({name, description, Custom}) => {
  return (
    <div className={styles.row}>
      <span className={styles.descriptionName}>{name}</span>
      {
        Custom ? (
          <Custom {...description} />
        )
        : description ? (
          <p className={styles.descriptionText}>{Array.isArray(description) ? description.join(', ') : typeof description === 'object' ? getObjectValue(description) : (description ? description : "No Data")}</p>
        ) : "No data"
      }
    </div>
  )
}

function setNeighbourCountries(data) {
  return data ? 
  (
    data.map(e => (
    <Link key={e.cca2} href={`/country/${e.cca2}`}>
      <a className={styles.neighbourLink}>
        <li key={e.cca2} className={styles.item}>
          <div className={styles.neighbourFlagContainer}>
            <Image
              className={styles.neighbourFlag}
              width={80} 
              height={60}
              placeholder="blur"  
              src={e.flags.png}
              alt="flag"
              objectFit="cover"
            />
          </div>
          <div className={styles.neighbourName}>{e.name.common}</div>
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
    <Layout title={country.name.official}>
      <section>
        <div className="container">
          <div className={styles.inner}>
            <div className={styles.smallContainer}>
              <div className={styles.imageContainer}>
                <Image 
                  className={styles.image} 
                  width={400} 
                  height={300} 
                  placeholder="blur"  
                  src={country.flags.png} 
                  alt="flag"
                />
              </div>
              <h2 className={styles.name}>
                {country.name.official}
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
                <Row name="Native name" description={country.name.nativeName}/>
                <Row 
                  name="Gini" 
                  description={country.gini}
                  Custom={(gini) => {
                    if(Object.keys(gini).length === 0) return 'No Data'
                    const [giniYear] = Object.keys(gini);
                    return (
                      <div className={styles.gini}>
                        <progress className={styles.progress} max="100" value={gini[giniYear]}></progress>
                        <span className={styles.counter}>{Math.round(gini[giniYear])}%</span>
                      </div>
                    )
                  }}
                />
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
  const [country] = await WolrdsRankService.getCountry(params.id);
  const neighbourCountries = country?.borders?.length > 0 ? await WolrdsRankService.getCountry(`?codes=${country.borders.join(",")}`) : null;

  return {
    props: {
      country,
      neighbourCountries
    }
  }
}

export default Country;
