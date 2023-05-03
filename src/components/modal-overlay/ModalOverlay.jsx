import React from 'react';
import styles from './ModalOverlay.module.css';
import { ModalOverlayPropType } from '../../utils/prop-types';

const ModalOverlay = (props) => {
  const { modalActive } = props;
  const activeModalClassName = modalActive ? `${styles.active} popup_opened` : '';

  return <div className={`${styles.modalOverlay} ${activeModalClassName}`} />;
};

ModalOverlay.propTypes = ModalOverlayPropType;

export default ModalOverlay;
