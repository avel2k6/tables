import { createContext } from 'react';

/**
 * Контекст модального окна
 */
export const ModalContext = createContext({
    onHide: () => {},
    size: 'normal',
});
