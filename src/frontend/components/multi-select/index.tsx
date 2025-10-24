import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';

import { MultiCheckbox } from '../multi-checkbox';

import { MultiSelectSize, classes } from './constants';
import { TMultiSelectProps } from './interfaces';

import './index.less';

/**
 * Компонент селекта с возможностью выбора нескольких значений
 */
export const MultiSelect = (props: TMultiSelectProps) => {
    const [isOpen, setOpen] = useState(false);

    const checkboxItems = props
        .selectOptions
        .map(({ value, title, tooltip }) => ({ value, label: title, tooltip }));

    // Исходные значения, пришедшие в пропсах
    const savedValues = props.values || [];

    // Значения селекта, которые выбраны, но ещё не сохранены
    const [values, setValues] = useState(savedValues);

    // Ref всего компонента
    const componentRef = useRef<HTMLDivElement>(null);

    /**
     * Открыть попап с опциями селекта
     */
    const openOptions = () => setOpen(true);

    /**
     * Выбор нового значения селекта
     * @param {string[]} newValues - Новые значения
     */
    const handleChange = (newValues: string[]) => {
        const { resetValues } = props;

        if (!resetValues) {
            setValues(newValues);
            return;
        }

        for (let i = 0; i < newValues.length; i++) {
            if (resetValues.includes(newValues[i]) && !values.includes(newValues[i])) {
                setValues([newValues[i]]);
                return;
            }
        }

        setValues(newValues.filter((value) => !resetValues.includes(value)));
    };

    /**
     * Закрыть попап с опциями селекта. Если выбранные значения изменились, поднимаем новое состояние наверх.
     */
    const closeOptions = () => {
        setOpen(false);

        // Если значения не изменились, не стоит поднимать состояние
        if (JSON.stringify(savedValues) === JSON.stringify(values)) {
            return;
        }

        props.onChange(values);
    };

    /**
     * Если значения поменялись извне, обновляем состояние до новых значений
     */
    useEffect(() => {
        if (JSON.stringify(savedValues) === JSON.stringify(values)) {
            return;
        }

        setValues(savedValues);
    }, [JSON.stringify(savedValues)]);

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
     * Клик вне попапа
     * @param {MouseEvent} e - Событие мыши
     * @param {EventTarget} e.target - Элемент, по которому кликнули
     */
    const handleClickOutside = ({ target }: MouseEvent) => {
        if (!isOpen) {
            return;
        }

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
        JSON.stringify(savedValues),
        JSON.stringify(values),
    ]);

    return <div
        className={classNames(classes.component, props.className, {
            [classes.small]: props.width === MultiSelectSize.SMALL,
            [classes.medium]: props.width === MultiSelectSize.MEDIUM,
            [classes.full]: props.width === MultiSelectSize.FULL,
        })}
        id={props.id}
        ref={componentRef}
        data-testid={props.dataTestId}>
        <button
            type='button'
            onClick={handleClickButton}
            className={classNames(classes.button, {
                [classes.placeholder]: savedValues.length === 0,
                [classes.buttonActive]: isOpen,
                [classes.buttonError]: props.hasError,
                [classes.buttonFilled]: props.hasFilledStyle && savedValues.length > 0,
            })}
            autoFocus={props.autoFocus}
        >
            {props.placeholder}{savedValues.length > 0 ? ` (${savedValues.length})` : ''}
        </button>
        {isOpen
            ? <div className={classes.options} role='menu'>
                <FocusLock>
                    <MultiCheckbox
                        items={checkboxItems}
                        values={values}
                        onChange={handleChange}
                        itemClassName={classes.option}/>
                </FocusLock>
            </div>
            : null}
    </div>;
};

const defaultProps: Partial<TMultiSelectProps> = {
    hasFilledStyle: false,
    hasError: false,
};

MultiSelect.defaultProps = defaultProps;
