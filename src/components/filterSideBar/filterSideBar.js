import React, {useState, useEffect} from 'react';
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
  ValueContainer: () => ({
    color: '#ffffff !important',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.1 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const FilterSideBar = ({
  openFilter, 
  setOpenFilter,
  regions, 
  subRegions, 
  minMaxArea, 
  continents, 
  timezones, 
  capitals, 
  currencies, 
  languages,
  selectedMinMaxArea,
  selectedRegions,
  selectedSubregions,
  selectedContinents,
  selectedTimezones,
  selectedCapitals,
  selectedCurrencys,
  selectedLanguages,
  setSelectedOption
}) => {

  const [tempSelectedOption, setTempSelectedOption] = useState({
    selectedMinMaxArea: selectedMinMaxArea,
    selectedRegions: selectedRegions,
    selectedSubregions: selectedSubregions,
    selectedContinents: selectedContinents,
    selectedTimezones: selectedTimezones,
    selectedCapitals: selectedCapitals,
    selectedCurrencys: selectedCurrencys,
    selectedLanguages: selectedLanguages,
  })

  useEffect(() => {
    setTempSelectedOption({
      selectedMinMaxArea: selectedMinMaxArea,
      selectedRegions: selectedRegions,
      selectedSubregions: selectedSubregions,
      selectedContinents: selectedContinents,
      selectedTimezones: selectedTimezones,
      selectedCapitals: selectedCapitals,
      selectedCurrencys: selectedCurrencys,
      selectedLanguages: selectedLanguages,
    })
  }, [openFilter])
  

  const handleMinMaxAreaChange = (event) => {
    const numberReg = new RegExp('^[0-9]*$');
    const type = event.target.name;
    const value = +event.target.value

    if (!numberReg.test(value)==false) {
      switch(type) {
        case 'min':
          if(value > selectedMinMaxArea[1]){
            if(value <= minMaxArea[1]) 
              setTempSelectedOption((prev) => ({...prev, selectedMinMaxArea: [value, value]}));
            else 
              break;
          } 
          else 
            setTempSelectedOption((prev) => ({...prev, selectedMinMaxArea: [value, prev[1] ? prev[1] : minMaxArea[1]]}))
          break;
        case 'max': 
          if(value > minMaxArea[1]) 
            return;
          if(value < selectedMinMaxArea[0]) 
            setTempSelectedOption((prev) => ({...prev, selectedMinMaxArea: [value, value]}));
          else 
            setTempSelectedOption((prev) => ({...prev, selectedMinMaxArea: [prev[0] ? prev[0] : minMaxArea[0], value]}));
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
                value={tempSelectedOption.selectedContinents || selectedContinents}
                onChange={(selectedOption) => {
                  setTempSelectedOption((prev) => ({...prev, selectedContinents: selectedOption}));
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
                value={tempSelectedOption.selectedRegions || selectedRegions}
                onChange={(selectedOption) => {
                  setTempSelectedOption((prev) => ({...prev, selectedRegions: selectedOption}));
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
                value={tempSelectedOption.selectedSubregions || selectedSubregions}
                onChange={(selectedOption) => {
                  setTempSelectedOption((prev) => ({...prev, selectedSubregions: selectedOption}));
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
                value={tempSelectedOption.selectedCapitals || selectedCapitals}
                onChange={(selectedOption) => {
                  setTempSelectedOption((prev) => ({...prev, selectedCapitals: selectedOption}));
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
                value={tempSelectedOption.selectedTimezones || selectedTimezones}
                onChange={(selectedOption) => {
                  setTempSelectedOption((prev) => ({...prev, selectedTimezones: selectedOption}));
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
                value={tempSelectedOption.selectedCurrencys || selectedCurrencys}
                onChange={(selectedOption) => {
                  setTempSelectedOption((prev) => ({...prev, selectedCurrencys: selectedOption}));
                }}
              />
            </label>
          </div>
          <div className={styles.formItem}>
            <label className={styles.formLabel}>
              <span className={styles.formItemName}>
                Languages
              </span>
              <Select
                className={styles.formInput}
                styles={selectStyles}
                isMulti 
                options={languages}
                value={tempSelectedOption.selectedLanguages || selectedLanguages}
                onChange={(selectedOption) => {
                  setTempSelectedOption((prev) => ({...prev, selectedLanguages: selectedOption}));
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
                  min={minMaxArea[0]}
                  max={minMaxArea[1]}
                  step={10000}
                  values={tempSelectedOption.selectedMinMaxArea.length ? tempSelectedOption.selectedMinMaxArea : selectedMinMaxArea.length ? selectedMinMaxArea : [minMaxArea[0], minMaxArea[1]]}
                  onChange={(values) => {
                    setTempSelectedOption((prev) => ({...prev, selectedMinMaxArea: values}));
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
                    value={tempSelectedOption.selectedMinMaxArea[0] || selectedMinMaxArea[0] ||  minMaxArea[0]} 
                    name="min"
                    className={styles.formAreaMinMaxInput}
                    onChange={(e) => handleMinMaxAreaChange(e)}
                  />
                  <input 
                    value={tempSelectedOption.selectedMinMaxArea[1] || selectedMinMaxArea[1] ||  minMaxArea[1]}
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
          onClick={() => {
            setSelectedOption(tempSelectedOption)
            setOpenFilter(false)}
          }
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSideBar;