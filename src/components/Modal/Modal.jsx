import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import { ModalPropType } from '../../utils/prop-types';
import usePopupClose from '../../hooks/usePopupClose';

const portal = document.getElementById('portal');
const Modal = (props) => {
  const { modalActive, setModalActive, children } = props;
  const activeModalClassName = modalActive ? styles.active : '';
  usePopupClose(modalActive, () => setModalActive(false));

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

Modal.propTypes = ModalPropType;

export default Modal;
