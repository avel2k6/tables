import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from './Modal';
import { ModalContext } from '../../contexts/modal';

import { modalSizes } from './constants';
import { TModalPortalProps } from './interfaces';

import './index.less';

/**
 * Компонент модального окна. Отрисовывается через портал в document.body
 */
export const ModalPortal = ({
    onHide, size = modalSizes.NORMAL, isShow, children,
}: TModalPortalProps) => {
    useEffect(() => {
        document.body.style.overflow = isShow ? 'hidden' : 'auto';

        /**
         * Закрываем модальное окно при нажатии Esc
         */
        const handleEscape = (e: KeyboardEvent) => {
            if (!isShow) {
                return;
            }

            if (e.key !== 'Esc' && e.key !== 'Escape') {
                return;
            }

            onHide();
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isShow]);

    return isShow
        ? createPortal(
            <Modal>
                <ModalContext.Provider value={{ onHide, size }}>
                    <Modal.Wrapper>
                        <Modal.Dialog>
                            {children}
                        </Modal.Dialog>
                    </Modal.Wrapper>
                </ModalContext.Provider>
            </Modal>,
            document.body,
        )
        : null;
};
