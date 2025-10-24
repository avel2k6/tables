import classNames from 'classnames';
import React from 'react';

import { ErrorBoundary } from '../error-boundary';

import { classes } from './constants';
import { TFooterProps } from './interfaces';

/**
 * Футер - подкомпонент модального окна для отображения кнопок управления
 * @component
 */
export const Footer = ({
    align, className, children, dataTestId,
}: TFooterProps) => <div
    className={classNames(classes.footer, className, {
        [classes.footerRight]: align === 'right',
    })}
    data-testid={dataTestId}>
    <ErrorBoundary>
        {children}
    </ErrorBoundary>
</div>;
