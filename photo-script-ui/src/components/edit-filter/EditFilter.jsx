import React from 'react';
import styles from './EditFilter.module.scss'

const EditFilter = ({name, handleChange, active, handleClick, min, max, value}) => {
  return(
    <div>
      <div className={styles.nameContainer}>
        <p className={styles.name} onClick={handleClick}>{name}</p>
      </div>
      {active &&
      <div className={styles.sliderContainer}>
        <input
          type="range"
          className={styles.slider}
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
        />
      </div>}
    </div>
  )
}

export default EditFilter;