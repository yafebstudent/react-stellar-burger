import { useEffect } from 'react';

export default function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlay = (event) => {
      if (event.target.classList.contains('ModalOverlay_active__KVEuU')) {
        closePopup();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOverlay);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOverlay);
    };
  }, [isOpen, closePopup]);
}
