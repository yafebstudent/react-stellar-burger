import React, { FC } from 'react';
import styles from './ModalOverlay.module.css';
import { IModalOverlayProps } from '../../utils/types';

const ModalOverlay: FC<IModalOverlayProps> = (props) => {
  const { isModalOpen } = props;
  const activeModalClassName = isModalOpen ? `${styles.active} popup_opened` : '';

  return <div className={`${styles.modalOverlay} ${activeModalClassName}`} />;
};

export default ModalOverlay;
