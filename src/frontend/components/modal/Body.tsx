import classNames from 'classnames';
import React, { useContext } from 'react';

import { ModalContext } from '../../contexts/modal';
import { ErrorBoundary } from '../error-boundary';

import { classes, modalSizes } from './constants';
import { TBodyProps } from './interfaces';

/**
 * Подкомпонент модального окна для отображения основного контента
 * @component
 */
export const Body = ({
    align, className, children, dataTestId,
}: TBodyProps) => {
    const { size } = useContext(ModalContext);

    return <div
        className={classNames(classes.body, className, {
            [classes.bodyRight]: align === 'right',
            [classes.bodyFullscreen]: size === modalSizes.FULLSCREEN,
        })}
        data-testid={dataTestId}>
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    </div>;
};
