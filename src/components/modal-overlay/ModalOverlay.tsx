import React, { FC } from 'react';
import styles from './ModalOverlay.module.css';

const ModalOverlay: FC = () => {
  return <div className={`${styles.modalOverlay} modalOpened`} />;
};

export default ModalOverlay;
