import React from 'react';

import { classes } from './constants';
import { TEmptyListProps } from './interfaces';
import './index.less';

/**
 * Текст, который показывается, когда нет элементов в списке
 * @component
 */
export const EmptyList = ({ message, dataTestId }: TEmptyListProps) => <div
    className={classes.component}
    data-testid={dataTestId}>
    {message}
</div>;
