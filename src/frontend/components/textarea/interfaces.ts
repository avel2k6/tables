import React from 'react';

/**
 * Тип пропсов компонента
 */
export type TProps = {
    // Дополнительный CSS-class для <textarea>.
    className?: string;

    // Дополнительный CSS-class для компонента.
    blockClassName?: string,

    // ID компонента.
    id?: string;

    // Значение textarea.
    value?: string,

    // Title для textarea.
    title?: string,

    // Placeholder.
    placeholder?: string,

    // Событие по onChange, в колбек передаем новое строковое значение.
    onChange?: (value: string) => void,

    // Событие по onBlur, в колбек передаем текущее строковое значение.
    onBlur?: (value: string) => void,

    // Событие по onKeyDown, в колбэк объект события.
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void,

    // Количество отображаемых строк.
    rows?: number,

    // Признак, есть ли ошибка.
    hasError?: boolean,

    // Textarea только для чтения.
    readOnly?: boolean,

    // Атрибут name.
    name?: string,

    // Блокирован textarea или нет.
    disabled?: boolean,

    // ID для тестирования.
    dataTestId?: string,

    // Признак авто фокуса.
    autoFocus?: boolean,
};
