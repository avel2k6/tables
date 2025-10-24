import classNames from 'classnames';
import React from 'react';

import { classes } from './constants';
import { TProps } from './interfaces';
import './index.less';

/**
 * Компонент, представляющий собой тег <textarea>.
 * @component
 */
export const Textarea = (props: TProps) => {
    /**
     * Обработчик ввода в textarea.
     * @param e - Событие ввода в textarea.
     */
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(e.target.value);

    /**
     * Потеря фокуса в textarea.
     */
    const handleBlur = () => props.onBlur(props.value);

    /**
     * Нажатие на клавишу.
     * @param e - Событие нажатия на клавишу в textarea.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => props.onKeyDown(e);

    return <div className={classNames(classes.component, { [classes.error]: props.hasError })}>
        <textarea
            id={props.id}
            data-testid={props.dataTestId}
            className={classNames(classes.textarea, props.className)}
            rows={props.rows}
            value={props.value}
            name={props.name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
        />
    </div>;
};

const defaultProps: Partial<TProps> = {
    value: '',
    onBlur: () => {},
    onKeyDown: () => {},
    onChange: () => {},
    rows: 1,
    hasError: false,
};

Textarea.defaultProps = defaultProps;
