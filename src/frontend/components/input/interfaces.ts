import React from 'react';

import { inputSize, inputTypes, inputWidth } from './constants';

/**
 * Пропсы компонента
 */
export type TInputProps = {
    // Ширина компонента
    width?: typeof inputWidth[keyof typeof inputWidth],

    // Размер компонента
    size?: typeof inputSize[keyof typeof inputSize],

    // Тип инпута, пока поддерживаем только text, number и time
    type?: typeof inputTypes[keyof typeof inputTypes],

    // Title для инпута
    title?: string,

    // Дополнительный ID компонента
    id?: string,

    // Дополнительный CSS-класс компонента
    className?: string,

    // Значение инпута
    value?: string | number,

    // Placeholder
    placeholder?: string,

    // Событие по onChange, в колбек передаем новое строковое значение
    onChange?: (value: string) => void,

    // Событие по onBlur, в колбек передаем текущее строковое значение
    onBlur?: (value: string | number) => void,

    // Событие по onKeyDown, в колбэк объект события
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,

    // Максимальная длина инпута
    maxLength?: number,

    // Мин. значение для типа number
    min?: number,

    // Признак, есть ли ошибка
    hasError?: boolean,

    // Иконка в начале поля
    icon?: 'search'

    // Признак, что для заполненного режима надо показать отдельный стиль
    hasFilledStyle?: boolean,

    // Признак, нужен ли "крестик" для очистки инпута
    hasClearButton?: boolean,

    // Инпут только для чтения
    readOnly?: boolean,

    // Атрибут name
    name?: string,

    // Блокирован инпут или нет
    disabled?: boolean,

    // ID для тестирования
    dataTestId?: string,

    // Признак авто фокуса.
    autoFocus?: boolean,
};
