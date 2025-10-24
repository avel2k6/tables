import classNames from 'classnames';
import React from 'react';

import { classes } from './constants';
import { TListSortButtonProps } from './interfaces';
import './index.less';

/**
 * Компонет кнопки сортировки, который рендерит передаваемый текст и иконку
 * @component
 */
export const ListSortButton = ({
    className, onClick, title, sort, children, dataTestId,
}: TListSortButtonProps) => <button
    className={classNames({
        [classes.component]: true,
        [className]: !!className,
    })}
    type='button'
    title={title}
    onClick={onClick}
    data-testid={dataTestId}>
    <span className={classNames({
        [classes.content]: true,
        [classes.active]: !!sort,
    })}>
        {children}
    </span>
    {sort
        ? <span className={classNames({
            [classes.sort]: true,
            [classes.sortDesc]: sort === 'desc',
        })}/>
        : null}
</button>;
