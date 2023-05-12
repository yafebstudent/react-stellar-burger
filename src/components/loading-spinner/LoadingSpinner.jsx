import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinnerWrapper}>
      <figure className={styles.loadingSpinner} />
    </div>
  );
};

export default LoadingSpinner;
