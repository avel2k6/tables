import classNames from 'classnames';
import React from 'react';

import { ErrorBoundary } from '../error-boundary';

import { classes } from './constants';
import { TTitleProps } from './interfaces';

/**
 * Подкомпонент модального окна для отображения текстового заголовка
 * @component
 */
export const Title = ({ className, children, dataTestId }: TTitleProps) => <div
    className={classNames(classes.title, className)}
    data-testid={dataTestId}>
    <ErrorBoundary>
        {children}
    </ErrorBoundary>
</div>;
