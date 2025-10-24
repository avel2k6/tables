import './index.less';

import classNames from 'classnames';
import React from 'react';

import { Checkbox } from '../checkbox';

import { classes } from './constants';
import { TMultiCheckboxProps } from './interfaces';

/**
 * Компонент коллекции чекбоксов.
 * Позволяет поднять состояние сразу нескольких чекбоксов.
 *
 * @component
 */
export const MultiCheckbox = (props: TMultiCheckboxProps) => {
    /**
     * Изменение состояния отдельного чекбокса. Поднимает состояние всего компонента.
     * @param value
     */
    const handleChange = (value: string) => (checked: boolean) => {
        if (checked) {
            // Поднимаем уникальную коллекцию состояний без повторов
            props.onChange([...new Set([...props.values, value])]);
            return;
        }
        props.onChange([...props.values].filter((val) => val !== value));
    };

    return <div
        className={classNames({
            [classes.component]: true,
            [props.className]: !!props.className,
        })}
        data-testid={props.dataTestId}>
        {props.items.map(({ value, label, tooltip }, index) => <div className={classes.item} key={value}>
            <Checkbox
                autoFocus={props.autoFocus && index === 0}
                className={props.itemClassName}
                checked={props.values.includes(value)}
                label={label}
                value={value}
                tooltip={tooltip}
                disabled={props.disabledValues.includes(value)}
                onChange={handleChange(value)}
                hasError={props.hasError}
            />
        </div>)}
    </div>;
};

const defaultProps: Partial<TMultiCheckboxProps> = {
    disabledValues: [],
};

MultiCheckbox.defaultProps = defaultProps;
