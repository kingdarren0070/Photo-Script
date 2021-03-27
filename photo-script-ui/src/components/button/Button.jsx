import React from 'react';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom'

const Button = ({ urlPath, buttonText }) => {
  return(
    <Link to={urlPath}>
      <button className={styles.mainContainer}>
        {buttonText}
      </button>
    </Link>
  )
}

export default Button;