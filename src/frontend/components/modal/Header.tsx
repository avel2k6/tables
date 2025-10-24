import classNames from 'classnames';
import React, { useContext } from 'react';

import { ModalContext } from '../../contexts/modal';
import { ErrorBoundary } from '../error-boundary';

import { classes, texts } from './constants';
import { THeaderProps } from './interfaces';

/**
 * Хедер - подкомпонент модального окна. Отображает заголовок и крестик для закрытия модального окна
 * @component
 */
export const Header = ({
    className, hasCloseButton, align, children, dataTestId,
}: THeaderProps) => {
    const { onHide } = useContext(ModalContext);

    return <div
        className={classNames(classes.header, className, {
            [classes.headerRight]: align === 'right',
        })}
        data-testid={dataTestId}>
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
        {hasCloseButton
            ? <button className={classes.close} title={texts.close} onClick={onHide} />
            : null}
    </div>;
};
