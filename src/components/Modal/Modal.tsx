import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import usePopupClose from '../../hooks/usePopupClose';
import { IModalProps } from '../../utils/types';

const portal = document.getElementById('portal');
const Modal: FC<IModalProps> = (props) => {
  const { isModalOpen, openModal, closeModal, children } = props;
  usePopupClose(isModalOpen, () => closeModal());

  useEffect(() => {
    openModal();
  }, [openModal]);

  return createPortal(
    <>
      <div
        className={`${styles.modalContent}`}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
        role="menuitem"
        tabIndex={0}
      >
        {children}
        <button className={`${styles.closeButton} mt-15 mr-10`} type="button" onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay />
    </>,
    portal as HTMLDivElement
  );
};

export default Modal;
