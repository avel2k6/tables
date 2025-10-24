/**
 * Пропсы компонента
 */
export type TRadioProps = {
    // ID radio-кнопки для связи с label
    id: string,

    // Текущее состояние радиокнопки
    checked: boolean,

    // Значение, за которое отвечает радиокнопка
    value: string,

    // Колбэк для поднятия состояния радиокнопки
    onChange: (checked: boolean) => void,

    // Дополнительный CSS-class компонента
    className?: string,

    // Label
    label: string,

    // Признак, есть ли ошибка
    hasError?: boolean,

    // Title
    title?: string,

    // Имя радиокнопки
    name?: string,

    // ID для тестирования
    dataTestId?: string,

    // Признак авто фокуса.
    autoFocus?: boolean,
};
