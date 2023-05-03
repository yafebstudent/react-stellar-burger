import React from 'react';
import styles from './ModalOverlay.module.css';

const ModalOverlay = (props) => {
  const { modalActive, setModalActive } = props;
  const activeModalClassName = modalActive ? styles.active : '';

  return (
    <div
      className={`${styles.modalOverlay} ${activeModalClassName}`}
      onClick={() => setModalActive(false)}
      onKeyDown={() => setModalActive(false)}
      role="menuitem"
      tabIndex={0}
      label="modal-overlay"
    />
  );
};

export default ModalOverlay;
