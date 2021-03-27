import React from 'react';
import styles from './Home.module.scss';

const Home = () => {
  return(
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div>
          Heading text
        </div>
        <button>
          New
        </button>
      </div>
    </div>
  )
}

export default Home;