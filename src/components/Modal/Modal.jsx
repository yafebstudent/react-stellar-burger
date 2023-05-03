import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';

const Modal = (props) => {
  const { modalActive, setModalActive, children } = props;
  const activeModalClassName = modalActive ? styles.active : '';
  const portal = useMemo(() => document.getElementById('portal'), []);

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === 'Escape') {
        setModalActive(false);
      }
    };

    window.addEventListener('keydown', closeModal);

    return () => window.removeEventListener('keydown', closeModal);
  }, [setModalActive]);

  return createPortal(
    <>
      <div
        className={`${styles.modalContent} ${activeModalClassName}`}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        role="menuitem"
        tabIndex={0}
      >
        {children}
        <button
          className={`${styles.closeButton} mt-15 mr-10`}
          type="button"
          onClick={() => setModalActive(false)}
        >
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay modalActive={modalActive} setModalActive={setModalActive} />
    </>,
    portal
  );
};

export default Modal;
