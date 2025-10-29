import classNames from 'classnames';
import React from 'react';

import { classes } from './constants';
import { TProps } from './interfaces';
import './index.less';

/**
 * Компонент, представляющий собой тег <textarea>.
 * @component
 */
export const Textarea = ({
    id,
    dataTestId,
    className,
    placeholder,
    value = '',
    onBlur = () => {},
    onKeyDown = () => {},
    onChange = () => {},
    rows = 1,
    hasError = false,
    name,
    readOnly,
    disabled,
    autoFocus,
    blockClassName,
}: TProps) => {
    /**
     * Обработчик ввода в textarea.
     * @param e - Событие ввода в textarea.
     */
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value);

    /**
     * Потеря фокуса в textarea.
     */
    const handleBlur = () => onBlur(value);

    /**
     * Нажатие на клавишу.
     * @param e - Событие нажатия на клавишу в textarea.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => onKeyDown(e);

    return <div className={classNames(classes.component, { [classes.error]: hasError }, blockClassName)}>
        <textarea
            id={id}
            data-testid={dataTestId}
            className={classNames(classes.textarea, className)}
            rows={rows}
            value={value}
            name={name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            autoFocus={autoFocus}
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
