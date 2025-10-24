import classNames from 'classnames';
import React, { useContext } from 'react';
import FocusLock from 'react-focus-lock';

import { ModalContext } from '../../contexts/modal';
import { ErrorBoundary } from '../error-boundary';

import { classes, modalSizes } from './constants';
import { TWrapperProps } from './interfaces';

/**
 * Компонент, отвечающий за положение (центрирование) модального окна на странице и затемняющий фон снаружи
 * @component
 */
export const Wrapper = ({ dataTestId, children }: TWrapperProps) => {
    const { size } = useContext(ModalContext);

    return <FocusLock className={classes.focus}>
        <div
            className={classNames({
                [classes.wrapper]: true,
                [classes.wrapperFullscreen]: size === modalSizes.FULLSCREEN,
            })}
            data-testid={dataTestId}>
            <div className={classes.backdrop} />
            <ErrorBoundary>
                {children}
            </ErrorBoundary>
        </div>
    </FocusLock>;
};
