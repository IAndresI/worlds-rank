import React, {useState} from 'react';
import { Range } from 'react-range';

import styles from './filterSideBar.module.scss';

const FilterSideBar = ({openFilter, setOpenFilter,regions, subRegions, minMaxArea}) => {
  const [userMinMaxArea, setUserMixManArea] = useState([minMaxArea.min, minMaxArea.max])
  return (
    <div className={`${styles.sideBarBackground} ${openFilter ? styles.open : styles.close}`}>
      <button 
        onClick={() => setOpenFilter(false)}
        className={styles.sideBarBackgroundCloseBtn}
      />
       <div className={styles.sideBar}>
        <h3 className={styles.title}>Filter</h3>
        <form className={styles.sideBarForm}>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Region
              </span>
              <select className={styles.formInput}>
                {
                  regions.map(region => <option key={region} value={region}>{region}</option>)
                }
              </select>
            </label>
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Sub Region
              </span>
              <select className={styles.formInput}>
                {
                  subRegions.map(region => <option key={region} value={region}>{region}</option>)
                }
              </select>
            </label>
          </div>

          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Area
              </span>
              <Range
                  min={minMaxArea.min}
                  max={minMaxArea.max}
                  step={10000}
                  values={userMinMaxArea}
                  onChange={(values) => {
                    setUserMixManArea(values);
                  }}
                  renderTrack={({ props, children }) => {
                    return (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '6px',
                          width: '100%',
                          backgroundColor: '#ccc',
                          borderRadius: 5,
                        }}
                      >
                        {children}
                      </div>
                    )
                  }}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '30px',
                        width: '30px',
                        borderRadius: "50%",
                        backgroundColor: 'var(--primary-color)'
                      }}
                    />
                  )}
                />
            </label>
          </div>
        </form>
        <button 
          className={styles.applyBtn}
          onClick={() => setOpenFilter(false)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSideBar;