import classNames from 'classnames';
import React from 'react';

import { Icons } from '../icons';

import {
    inputWidth, classes, texts, inputSize, inputTypes,
} from './constants';
import { TInputProps } from './interfaces';
import './index.less';

/**
 * Компонент инпута с кнопкой очистки и отображением количества символов
 * @component
 */
export const Input = (props: TInputProps) => {
    /**
     * Обработка полученного value в зависимотсти от типа инпута
     * @returns {string} Обработанное value
     */
    const getCorrectValue = (): string => {
        const { value, type } = props;

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
        const { value } = e.target;

        if (props.type === inputTypes.NUMBER) {
            props.onChange(value || '0');
            return;
        }

        // Обрезаем строку, несмотря на такую же возможность в браузере. Чтобы работало наверняка и можно было протестировать
        props.onChange(value.substring(0, props.maxLength || value.length));
    };

    /**
     * Потеря фокуса инпута
     */
    const handleBlur = () => props.onBlur(props.value);

    /**
     * Нажатие на клавишу
     * @param {React.KeyboardEvent<HTMLInputElement>} e - Событие нажатия на клавишу в инпуте
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => props.onKeyDown(e);

    /**
     * Очистка инпута
     */
    const handleClearInput = () => props.onChange('');

    // Строчное значение инпута для оригинального элемента
    const valueForInput = getCorrectValue();

    return <div
        className={classNames({
            [classes.component]: true,
            [classes.smallSize]: props.size === inputSize.SMALL,
            [props.className]: !!props.className,
            [classes.withCounter]: !!props.maxLength,
            [classes.error]: props.hasError,
            [classes.small]: props.width === inputWidth.SMALL,
            [classes.medium]: props.width === inputWidth.MEDIUM,
            [classes.full]: props.width === inputWidth.FULL,
            [classes.filled]: props.hasFilledStyle && !!valueForInput,
            [classes.disabled]: props.disabled,
        })}
        id={props.id}
        data-testid={props.dataTestId}>
        {props.icon
            ? <div className={classNames({
                [classes.icon]: true,
                [classes.iconSearch]: props.icon === 'search',
            })}/>
            : null}
        <input
            className={classNames({
                [classes.input]: true,
                [classes.inputSmall]: props.size === inputSize.SMALL,
            })}
            title={props.title}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            type={props.type}
            placeholder={props.placeholder}
            value={valueForInput}
            maxLength={props.maxLength}
            min={props.min}
            readOnly={props.readOnly}
            autoFocus={props.autoFocus}
            disabled={props.disabled}/>
        {props.hasClearButton && !props.disabled && valueForInput.length
            ? <span className={classes.clear} onClick={handleClearInput}>
                <Icons.Close color='red'/>
            </span>
            : null}
        {props.maxLength
            ? <span className={classes.counter}>{`${valueForInput.length} ${texts.outOf} ${props.maxLength}`}</span>
            : null}
    </div>;
};

const defaultProps: Partial<TInputProps> = {
    type: inputTypes.TEXT,
    size: inputSize.DEFAULT,
    hasFilledStyle: false,
    hasClearButton: true,
    hasError: false,
    readOnly: false,
    disabled: false,
    onChange: () => {},
    onBlur: () => {},
    onKeyDown: () => {},
};

Input.defaultProps = defaultProps;
