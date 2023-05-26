import React, { FC } from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: FC = () => {
  return (
    <div className={styles.loadingSpinnerWrapper}>
      <figure className={styles.loadingSpinner} />
    </div>
  );
};

export default LoadingSpinner;
