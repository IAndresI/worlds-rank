import React, {useState} from 'react';
import { Range } from 'react-range';
import Select from 'react-select';

import styles from './filterSideBar.module.scss';

const selectStyles = {
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--background-color)",
    borderRadius: 6,
  }),
  menuPortal: (provided, state) => ({
    ...provided,
    backgroundColor: "var(--background-color)",
    borderRadius: 6,
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'var(--text-color)',
    padding: 20,
    cursor: 'pointer',
    transition: "all .3s",
    backgroundColor: state.isFocused ? "var(--primary-color)" : "transparent",
    borderRadius: 6,
    "&:hover, &:focus, &:active": {
      backgroundColor:"var(--primary-color)",
      outline: "transparent"
    },
  }),
  control: () => ({
    width: "100%",
    display: 'flex',
    color: 'white',
    cursor: 'pointer',
    border: '1px solid var(--primary-color)',
    borderRadius: 6,
    padding: "5px 10px"
  }),
  multiValue: () => ({
    display: 'flex',
    borderRadius: 6,
    margin: "2px 2px 2px 0",
    backgroundColor: 'var(--text-color-secondary)',
  }),
  multiValueRemove: () => ({
    color: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "5px",
    transition: "all .3s",
    "&:hover": {
      borderRadius: 6,
      backgroundColor:"rgb(250, 149, 131);"
    }

  }),
  clearIndicator: () => ({
    display: 'flex',
    color: 'white',
    width: "100%",
    transition: "all .3s",
    "&:hover, &:focus": {
      color:"red"
    }
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.1 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const FilterSideBar = ({openFilter, setOpenFilter,regions, subRegions, minMaxArea, continents, timezones, capitals, currencies}) => {
  const [selectedMinMaxArea, setSelectedMixManArea] = useState([])
  const [selectedRegion, setSelectedRegion] = useState([])
  const [selectedSubRegion, setSelectedSubRegion] = useState([])
  const [selectedContinent, setSelectedContinent] = useState([])
  const [selectedTimezones, setSelectedTimezones] = useState([])
  const [selectedCapital, setSelectedCapital] = useState([])
  const [selectedCurrencies, setSelectedCurrencies] = useState([])

  const handleMinMaxAreaChange = (event) => {
    const numberReg = new RegExp('^[0-9]*$');
    const type = event.target.name;
    const value = +event.target.value

    if (!numberReg.test(value)==false) {
      switch(type) {
        case 'min':
          if(value > selectedMinMaxArea[1]){
            
            if(value <= minMaxArea.max) setSelectedMixManArea([value, value]);
            else break;
          } 
          else setSelectedMixManArea((prev) => ([value, prev[1] ? prev[1] : minMaxArea.max]));
          break;
        case 'max': 
          if(value > minMaxArea.max) return;
          if(value < selectedMinMaxArea[0]) setSelectedMixManArea([value, value]);
          else setSelectedMixManArea((prev) => ([prev[0] ? prev[0] : minMaxArea.min, value]));
          break;
        default:
          return;
      }
    }
  }

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
                Continent
              </span>
              <Select
                className={styles.formInput}
                styles={selectStyles}
                isMulti 
                options={continents}
                value={selectedContinent}
                onChange={(selectedOption) => {
                  setSelectedContinent(selectedOption);
                }}
              />
            </label>
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Region
              </span>
              <Select
                className={styles.formInput}
                styles={selectStyles}
                isMulti 
                options={regions}
                value={selectedRegion}
                onChange={(selectedOption) => {
                  setSelectedRegion(selectedOption);
                }}
              />
            </label>
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Sub Region
              </span>
              <Select
                className={styles.formInput}
                styles={selectStyles}
                isMulti 
                options={subRegions}
                value={selectedSubRegion}
                onChange={(selectedOption) => {
                  setSelectedSubRegion(selectedOption);
                }}
              />
            </label>
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Capital
              </span>
              <Select
                className={styles.formInput}
                styles={selectStyles}
                isMulti 
                options={capitals}
                value={selectedCapital}
                onChange={(selectedOption) => {
                  setSelectedCapital(selectedOption);
                }}
              />
            </label>
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Timezone
              </span>
              <Select
                className={styles.formInput}
                styles={selectStyles}
                isMulti 
                options={timezones}
                value={selectedTimezones}
                onChange={(selectedOption) => {
                  setSelectedTimezones(selectedOption);
                }}
              />
            </label>
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Currencies
              </span>
              <Select
                className={styles.formInput}
                styles={selectStyles}
                isMulti 
                options={currencies}
                value={selectedCurrencies}
                onChange={(selectedOption) => {
                  setSelectedCurrencies(selectedOption);
                }}
              />
            </label>
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Area
              </span>
              <div className={styles.formAreaInputs}>
                <Range
                  min={minMaxArea.min}
                  max={minMaxArea.max}
                  step={10000}
                  values={selectedMinMaxArea.length ? selectedMinMaxArea : [minMaxArea.min, minMaxArea.max]}
                  onChange={(values) => {
                    setSelectedMixManArea(values);
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
                <div className={styles.formAreaMinMax}>
                  <input 
                    value={selectedMinMaxArea[0] || minMaxArea.min} 
                    name="min"
                    className={styles.formAreaMinMaxInput}
                    onChange={(e) => handleMinMaxAreaChange(e)}
                  />
                  <input 
                    value={selectedMinMaxArea[1] || minMaxArea.max}
                    name="max"
                    className={styles.formAreaMinMaxInput}
                    onChange={(e) => handleMinMaxAreaChange(e)}
                  />
                </div>
              </div>
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