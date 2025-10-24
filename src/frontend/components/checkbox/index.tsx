import './index.less';

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { uuidv4 } from '../../helpers/uuid-v4';

import { classes } from './constants';
import { TCheckboxProps } from './interfaces';

/**
 * Компонент чекбокса. Включает в себя сам чекбокс и лейбл к нему.
 * Поднимает свое состояния через onChange.
 *
 * В случае, если не передан ID для компонента, он сам сгенерирует уникальный.
 *
 * @component
 */
export const Checkbox = (props: TCheckboxProps) => {
    // ID компонента.
    const [id, setId] = useState(props.id);

    /**
     * Генерируем уникальный ID через `crypto.randomUUID`, если ID не был передан.
     */
    useEffect(() => {
        // Если id передан, то не генерируем его.
        if (props.id) {
            return;
        }
        const randomID = uuidv4();

        setId(randomID);
    }, []);

    /**
     * Изменения состояния чекбокса
     */
    const handleChange = () => {
        if (props.disabled) {
            return;
        }
        props.onChange(!props.checked);
    };

    return <div
        className={classNames({
            [classes.component]: true,
            [classes.disabled]: props.disabled,
            [props.className]: !!props.className,
        })}
        title={props.tooltip}
        data-testid={props.dataTestId}>
        <input
            id={id}
            value={props.value}
            className={classNames({
                [classes.input]: true,
                [classes.inputChecked]: props.checked,
                [classes.inputError]: props.hasError,
            })}
            type='checkbox'
            checked={props.checked}
            onChange={handleChange}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
        />
        {props.label
            ? <label
                className={classes.label}
                htmlFor={id}>
                {props.label}
            </label>
            : null}
    </div>;
};

const defaultProps: Partial<TCheckboxProps> = {
    disabled: false,
};

Checkbox.defaultProps = defaultProps;
