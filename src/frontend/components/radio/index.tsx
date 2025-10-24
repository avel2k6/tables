import './index.less';

import classNames from 'classnames';
import React from 'react';

import { classes } from './constants';
import { TRadioProps } from './interfaces';

/**
 * Компонент радиокнопки. Включает в себя саму кнопку и лейбл к ней.
 * Поднимает свое состояния через onChange
 *
 * @component
 */
export const Radio = (props: TRadioProps) => {
    /**
     * Изменения состояния радиокнопки
     */
    const handleChange = () => {
        if (props.checked) {
            return;
        }
        props.onChange(props.checked);
    };

    return <div
        className={classNames({
            [classes.component]: true,
            [props.className]: !!props.className,
        })}
        data-testid={props.dataTestId}>
        <input
            className={classNames({
                [classes.input]: true,
                [classes.error]: props.hasError,
            })}
            id={props.id}
            value={props.value}
            name={props.name}
            title={props.title}
            type='radio'
            checked={props.checked}
            onChange={handleChange}
            autoFocus={props.autoFocus}
        />
        <label htmlFor={props.id} className={classes.label}>{props.label}</label>
    </div>;
};

const defaultProps: Partial<TRadioProps> = {
    name: '',
    title: '',
};

Radio.defaultProps = defaultProps;
