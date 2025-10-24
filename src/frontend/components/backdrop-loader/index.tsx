import './index.less';

import React from 'react';

import { Loader } from '../loader';
import { fetchStateStatus } from '../loader/constants';

import { SPINNER_POSITION, Z_INDEX, classes } from './constants';
import { TBackdropLoaderProps } from './interfaces';

/**
 * Компонент со спиннером для затенения контента. Накладывается сверху на контент.
 * @component
 */
export const BackdropLoader = ({ type, dataTestId }: TBackdropLoaderProps) => <div
    className={classes.component}
    style={{ zIndex: Z_INDEX }}
    data-testid={dataTestId}>
    <div className={classes.spinner} style={{ top: SPINNER_POSITION }}>
        <Loader type={type} size='normal' />
    </div>
</div>;

const defaultProps: Partial<TBackdropLoaderProps> = {
    type: fetchStateStatus.LOADING,
};

BackdropLoader.defaultProps = defaultProps;
