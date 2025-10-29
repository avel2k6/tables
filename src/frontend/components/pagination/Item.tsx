import classNames from 'classnames';
import React from 'react';

import { classes } from './constants';
import { TPaginationElementProps } from './interfaces';

export const Item = (props:TPaginationElementProps) => <button
    className={classNames({
        [classes.item]: true,
        [classes.itemActive]: props.active,
        [classes.itemDisabled]: props.disabled,
    })}
    disabled={props.disabled}
    onClick={props.onClick}>
    {props.children}
</button>;
