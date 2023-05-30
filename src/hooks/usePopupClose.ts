import { useEffect } from 'react';

export default function usePopupClose(isOpen: boolean, closePopup: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const handleOverlay = (event: MouseEvent) => {
      if ((event.target as Element).classList.contains('modalOpened')) {
        closePopup();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
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
