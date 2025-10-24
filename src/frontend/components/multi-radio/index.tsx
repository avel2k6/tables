import './index.less';

import classNames from 'classnames';
import React from 'react';

import { Radio } from '../radio';

import { classes, directions } from './constants';
import { TMultiRadioProps } from './interfaces';

/**
 * Компонент коллекции радиокнопок.
 * Позволяет поднять состояние сразу нескольких радиокнопок.
 *
 * @component
 */
export const MultiRadio = (props: TMultiRadioProps) => {
    /**
     * Изменение состояния отдельной радиокнопки. Поднимает состояние всего компонента.
     * @param {string} value
     */
    const handleChange = (value: string) => (checked: boolean) => {
        if (checked && value === props.value) {
            return;
        }
        props.onChange(value);
    };

    return <div
        className={classNames({
            [classes.component]: true,
            [classes.column]: props.flow === directions.COLUMN,
            [props.className]: !!props.className,
        })}
        data-testid={props.dataTestId}>
        {props.items.map(({ id, value, label }, index) => <div key={value}>
            <Radio
                autoFocus={props.autoFocus && index === 0}
                id={id}
                checked={props.value === value}
                label={label}
                value={value}
                onChange={handleChange(value)}
                hasError={props.hasError}
                name={props.name}
            />
        </div>)}
    </div>;
};

const defaultProps: Partial<TMultiRadioProps> = {
    name: '',
    flow: directions.ROW,
};

MultiRadio.defaultProps = defaultProps;
