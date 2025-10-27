import classNames from 'classnames';
import React from 'react';

import { Icons } from '../icons';

import {
    inputWidth, classes, texts, inputSize, inputTypes,
} from './constants';
import { TInputProps } from './interfaces';
import './index.less';

console.log('123');
/**
 * Компонент инпута с кнопкой очистки и отображением количества символов
 * @component
 */
export const Input = ({
    type = inputTypes.TEXT,
    size = inputSize.DEFAULT,
    hasFilledStyle = false,
    hasClearButton = true,
    hasError = false,
    readOnly = false,
    disabled = false,
    onChange = () => {},
    onBlur = () => {},
    onKeyDown = () => {},
    maxLength,
    value,
    className,
    width,
    id,
    dataTestId,
    icon,
    title,
    placeholder,
    min,
    autoFocus,
}: TInputProps) => {
    /**
     * Обработка полученного value в зависимотсти от типа инпута
     * @returns {string} Обработанное value
     */
    const getCorrectValue = (): string => {
        if (type === inputTypes.NUMBER) {
            return value
                ? value.toString()
                : '0';
        }

        // Строчное значение инпута, с которым может работать оригинальный элемент
        return value
            ? value.toString()
            : '';
    };

    /**
     * Заполнение инпута
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения значения инпута
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (type === inputTypes.NUMBER) {
            onChange(newValue || '0');
            return;
        }

        // Обрезаем строку, несмотря на такую же возможность в браузере. Чтобы работало наверняка и можно было протестировать
        onChange(newValue.substring(0, maxLength || newValue.length));
    };

    /**
     * Потеря фокуса инпута
     */
    const handleBlur = () => onBlur(value);

    /**
     * Нажатие на клавишу
     * @param {React.KeyboardEvent<HTMLInputElement>} e - Событие нажатия на клавишу в инпуте
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(e);

    /**
     * Очистка инпута
     */
    const handleClearInput = () => onChange('');

    // Строчное значение инпута для оригинального элемента
    const valueForInput = getCorrectValue();

    return <div
        className={classNames({
            [classes.component]: true,
            [classes.smallSize]: size === inputSize.SMALL,
            [className]: !!className,
            [classes.withCounter]: !!maxLength,
            [classes.error]: hasError,
            [classes.small]: width === inputWidth.SMALL,
            [classes.medium]: width === inputWidth.MEDIUM,
            [classes.full]: width === inputWidth.FULL,
            [classes.filled]: hasFilledStyle && !!valueForInput,
            [classes.disabled]: disabled,
        })}
        id={id}
        data-testid={dataTestId}>
        {icon
            ? <div className={classNames({
                [classes.icon]: true,
                [classes.iconSearch]: icon === 'search',
            })}/>
            : null}
        <input
            className={classNames({
                [classes.input]: true,
                [classes.inputSmall]: size === inputSize.SMALL,
            })}
            title={title}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            type={type}
            placeholder={placeholder}
            value={valueForInput}
            maxLength={maxLength}
            min={min}
            readOnly={readOnly}
            autoFocus={autoFocus}
            disabled={disabled}/>
        {hasClearButton && !disabled && valueForInput.length
            ? <span className={classes.clear} onClick={handleClearInput}>
                <Icons.Close color='red'/>
            </span>
            : null}
        {maxLength
            ? <span className={classes.counter}>{`${valueForInput.length} ${texts.outOf} ${maxLength}`}</span>
            : null}
    </div>;
};
