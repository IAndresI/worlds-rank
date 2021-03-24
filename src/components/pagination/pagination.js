import React, {useEffect} from 'react';
import styles from './pagination.module.scss';

const Pagination = ({itemsCount, currentPage, setPage, itemsPerPage}) => {
  if(itemsCount < itemsPerPage) return null;

  useEffect(() => {
    setPage(0)
  }, [itemsCount])

  return (
    <div>
      <ul className={styles.list}>
        {itemsCount < itemsPerPage ? null : (
          <li className={styles.item}>
            <button
              className={styles.button}
              onClick={() => setPage(0)}
            >
              ‹‹
            </button>
          </li>
        )}
        {
          (() => {
            let finalArr = [];
            for(let i = 0; i< Math.ceil(itemsCount/itemsPerPage); i++) finalArr.push(
              <li key={i} className={styles.item}>
                {
                  i == currentPage ? (
                    <span
                      className={`${styles.button} ${styles.button__active}`}
                    >
                      {i+1}
                    </span>
                  )
                  :
                  (
                    <button
                      className={styles.button}
                      onClick={() => setPage(i)}
                    >
                      {i+1}
                    </button>
                  )
                }
                
              </li>
            )
            return finalArr;
          })()
        }
        {itemsCount < itemsPerPage ? null : (
          <li className={styles.item}>
            <button
              className={styles.button}
              onClick={() => setPage(Math.ceil(itemsCount/itemsPerPage - 1))}
            >
              ››
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;