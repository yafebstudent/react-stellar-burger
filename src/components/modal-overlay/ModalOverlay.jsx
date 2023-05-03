import React from 'react';
import styles from './ModalOverlay.module.css';

const ModalOverlay = (props) => {
  const { modalActive } = props;
  const activeModalClassName = modalActive ? styles.active : '';

  return <div className={`${styles.modalOverlay} ${activeModalClassName}`} />;
};

export default ModalOverlay;
