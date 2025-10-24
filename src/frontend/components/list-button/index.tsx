import './index.less';
import classNames from 'classnames';
import React from 'react';

import { Button } from '../button';
import { TButtonProps } from '../button/interfaces';

import { classes } from './constants';

/**
 * Компонент кнопки внутри таблицы листинга элементов. Способен отрисовать как кнопку, так и ссылку
 * @component
 */
export const ListButton = ({ dataTestId, ...props }: TButtonProps) => <div
    className={classNames(classes.component, props.className, {
        [classes.fullWidth]: props.width === 'full',
    })}
    data-testid={dataTestId}>
    <Button {...props}/>
</div>;
