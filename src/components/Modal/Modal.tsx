import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import usePopupClose from '../../hooks/usePopupClose';
import { IModalProps } from '../../utils/types';

const portal = document.getElementById('portal');
const Modal: FC<IModalProps> = (props) => {
  const { isModalOpen, closeModal, children } = props;
  const activeModalClassName = isModalOpen ? styles.active : '';
  usePopupClose(isModalOpen, () => closeModal());

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
        <button className={`${styles.closeButton} mt-15 mr-10`} type="button" onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay isModalOpen={isModalOpen} />
    </>,
    portal as HTMLDivElement
  );
};

export default Modal;
