import React from 'react';
import { createRoot } from 'react-dom/client';

import { ConfirmModal } from './ConfirmModal';
import { confirmDefaultTexts } from './constants';

/**
 * Аналог window.confirm только в основе наш компонент модального окна.
 *
 * @param texts - текст для модального окна
 */
export const confirm = (texts: Partial<typeof confirmDefaultTexts>): Promise<boolean> => new Promise((resolve) => {
    // Тексты для модального окна, обогащенные дефолтными значениями
    const modalTexts = { ...confirmDefaultTexts, ...texts };

    const rootElement = document.createElement('div');
    document.body.appendChild(rootElement);
    const appContainerRoot = createRoot(rootElement);

    /**
     * Размонтирование компонента и удаление сопутствующей разметки, которая больше не используется.
     */
    const unmountModal = () => {
        appContainerRoot.unmount();
        document.body.removeChild(rootElement);
        rootElement.remove();
    };

    /**
     * Обработчик кнопки "Ок"
     */
    const handleConfirm = () => {
        resolve(true);
        unmountModal();
    };

    /**
     * Обработчик кнопки "Отмена"
     */
    const handleDismiss = () => {
        resolve(false);
        unmountModal();
    };

    appContainerRoot.render(<ConfirmModal
        cancel={modalTexts.cancel}
        confirm={modalTexts.confirm}
        title={modalTexts.title}
        body={<>{modalTexts.body}</>}
        isShow
        onConfirm={handleConfirm}
        onHide={handleDismiss}/>);
});
