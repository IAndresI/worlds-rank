import React, {useEffect, useState} from 'react';
import styles from './pagination.module.scss';

const Pagination = ({itemsCount, currentPage, setPage, itemsPerPage}) => {

  if(itemsCount < itemsPerPage) return null;

  const [paginationList, setPaginationList] = useState(setPagination())

  useEffect(() => {
    setPage(0);
    setPaginationList(setPagination());
  }, [itemsCount])

  useEffect(() => {
    setPaginationList(setPagination());
  }, [currentPage])

  function setPaginationItem(count) {
    return(
      <li key={count} className={styles.item}>
        {
          count == currentPage ? (
            <span
              className={`${styles.button} ${styles.button__active}`}
            >
              {count+1}
            </span>
          )
          :
          (
            <button
              className={styles.button}
              onClick={() => {setPage(count)}}
            >
              {count+1}
            </button>
          )
        }
      </li>
    )
  }

  function setPagination() {
    let finalArr = [];
    if(Math.ceil(itemsCount/itemsPerPage) > 5) {
      let startArr = [];
      for(let i = currentPage-1;i > currentPage - 3 && i >= 0;i--) startArr.push(setPaginationItem(i))
      for(let i = currentPage;i < Math.ceil(itemsCount/itemsPerPage) && i <= currentPage+2;i++) finalArr.push(setPaginationItem(i))
      return [...(startArr).reverse(), ...finalArr];
    }
    else {
      for(let i = 0; i < Math.ceil(itemsCount/itemsPerPage); i++) finalArr.push(setPaginationItem(i))
      return finalArr;
    };
  }

  return (
    <div>
      <ul className={styles.list}>
        
        {itemsCount < itemsPerPage || Math.ceil(itemsCount/itemsPerPage) <= 5 ? null : (
          <li className={styles.item}>
            <button
              className={styles.button}
              onClick={() => setPage(0)}
            >
              ‹‹
            </button>
          </li>
        )}

        {paginationList}

        {itemsCount < itemsPerPage || Math.ceil(itemsCount/itemsPerPage) <= 5 ? null : (
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