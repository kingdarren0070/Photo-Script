import React from 'react';
import Button from '../../button/Button';
import styles from './Home.module.scss';

const Home = () => {
  return(
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.heroHeading}>
          The All New Browser-Based Photo Editor of 2021!
        </div>
        <br />
        <Button urlPath='/new' buttonText="New Project"/>
      </div>
    </div>
  )
}

export default Home;