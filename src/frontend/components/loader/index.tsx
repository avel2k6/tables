import './index.less';

import classNames from 'classnames';
import React from 'react';

import { classes, fetchStateStatus } from './constants';
import { TLoaderProps } from './interfaces';

/**
 * Компонент лоадера
 * @component
 */
export const Loader = ({ type, size, dataTestId }: TLoaderProps) => <div
    className={classNames({
        [classes.component]: true,
        [classes.spinner]: type === fetchStateStatus.LOADING,
        [classes.success]: type === fetchStateStatus.SUCCESS,
        [classes.warning]: type === fetchStateStatus.ERROR,
        [classes.small]: size === 'small',
    })}
    data-testid={dataTestId} />;

const defaultProps: Partial<TLoaderProps> = {
    type: fetchStateStatus.LOADING,
    size: 'small',
};

Loader.defaultProps = defaultProps;
