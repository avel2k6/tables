import './index.less';

import classNames from 'classnames';
import React from 'react';

import { classes } from './constants';
import { TListFilterCommonProps } from './interfaces';

const ListFilter = (props: TListFilterCommonProps) => <div className={classNames({
    [classes.component]: true,
    [props.className]: !!props.className,
})}>
    {props.children}
</div>;

const Item = (props: TListFilterCommonProps) => <div className={classNames({
    [classes.item]: true,
    [props.className]: !!props.className,
})}>
    {props.children}
</div>;

ListFilter.Item = Item;

export { ListFilter };
