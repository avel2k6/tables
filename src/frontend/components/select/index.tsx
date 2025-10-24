import './index.less';

import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';

import { selectWith, classes, selectSize } from './constants';
import { TSelectProps } from './interfaces';

/**
 * Компонент селекта
 * @component
 */
export const Select = (props: TSelectProps) => {
    const [isOpen, setOpen] = useState(false);

    // Реф всего компонента
    const componentRef = useRef<HTMLDivElement>(null);

    /**
     * Открыть попап с опциями селекта
     */
    const openOptions = () => setOpen(true);

    /**
     * Закрыть попап с опциями селекта
     */
    const closeOptions = () => setOpen(false);

    /**
     * Клик по основной кнопке виджета
     */
    const handleClickButton = () => {
        if (isOpen) {
            closeOptions();
            return;
        }
        openOptions();
    };

    /**
     * Выбор нового значения селекта. Сразу закрываем попап.
     * @param {string} value
     */
    const handleChange = (value: string) => () => {
        setOpen(false);

        // Если выбрано то же самое значение, то достаточно просто закрыть опции.
        if (value === props.value) {
            return;
        }

        // В противном случае выбираем новое значение и поднимаем "change".
        props.onChange(value);
        const changeEvent = new Event('change', { bubbles: true });
        componentRef.current?.dispatchEvent(changeEvent);
    };

    /**
     * Клик вне опций селекта
     * @param {MouseEvent} e
     */
    const handleClickOutside = (e: MouseEvent) => {
        if (!isOpen) {
            return;
        }

        const { target } = e;
        if (!(target instanceof HTMLElement)) {
            closeOptions();
            return;
        }

        if (componentRef.current && !componentRef.current.contains(target)) {
            closeOptions();
        }
    };

    /**
     * Закрываем опции при нажатии Esc
     */
    const handleEscape = (e: KeyboardEvent) => {
        if (!isOpen) {
            return;
        }

        if (e.key !== 'Escape') {
            return;
        }

        closeOptions();
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [
        isOpen,
    ]);

    return <div
        role='select'
        ref={componentRef}
        className={classNames({
            [classes.component]: true,
            [props.className]: !!props.className,
            [classes.smallWidth]: props.width === selectWith.SMALL,
            [classes.mediumWidth]: props.width === selectWith.MEDIUM,
            [classes.fullWidth]: props.width === selectWith.FULL,
            [classes.smallSize]: props.size === selectSize.SMALL,
        })}
        id={props.id}
        data-testid={props.dataTestId}>
        <button
            type='button'
            onClick={handleClickButton}
            autoFocus={props.autoFocus}
            className={classNames({
                [classes.button]: true,
                [classes.placeholder]: !props.value,
                [classes.buttonActive]: isOpen,
                [classes.buttonError]: props.hasError,
                [classes.buttonFilled]: props.hasFilledStyle && !!props.value,
                [classes.buttonSmall]: props.size === selectSize.SMALL,
            })}>
            {!props.value && props.placeholder
                ? props.placeholder
                : props.selectOptions.find((option) => option.value === props.value).title}
        </button>
        {isOpen
            ? <div className={classes.options} role='menu'>
                <FocusLock>
                    {props.selectOptions
                        .map(({ title, value, tooltip }) => <button
                            role='option'
                            key={`${value}_${title}`}
                            className={classNames({
                                [classes.option]: true,
                                [classes.optionSelected]: value === props.value,
                            })}
                            title={tooltip}
                            onClick={handleChange(value)}>
                            {title}
                        </button>)}
                </FocusLock>
            </div>
            : null}
    </div>;
};

const defaultProps: Partial<TSelectProps> = {
    size: selectSize.DEFAULT,
    hasFilledStyle: false,
    hasError: false,
    onChange: () => {},
};

Select.defaultProps = defaultProps;
