import classNames from 'classnames';
import React, { useContext } from 'react';

import { ModalContext } from '../../contexts/modal';
import { ErrorBoundary } from '../error-boundary';

import { classes, modalSizes, roles } from './constants';
import { TDialogProps } from './interfaces';

/**
 * Компонент, содержащий контент модального окна
 * @component
 */
export const Dialog = ({ dataTestId, children }: TDialogProps) => {
    const { size } = useContext(ModalContext);

    return <div
        className={classNames({
            [classes.dialog]: true,
            [classes.dialogFullscreen]: size === modalSizes.FULLSCREEN,
        })}
        role={roles.dialog}
        data-testid={dataTestId}>
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    </div>;
};
