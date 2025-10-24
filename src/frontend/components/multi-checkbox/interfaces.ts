/**
 * Данные для отрисовки отдельного элемента коллекции чекбоксов
 */
type TMultiCheckboxItem = {
    // Значение, за которое отвечает чекбокс
    value: string,

    // Label чекбокса
    label: string

    // Подсказка чекбокса
    tooltip?: string,
};

/**
 * Пропсы компонента
 */
export type TMultiCheckboxProps = {
    // Данные для отрисовки всех чекбоксов
    items: TMultiCheckboxItem[],

    // Состояние всего компонента (значения выбранных чекбоксов)
    values: string[],

    // Недоступные для выбора значения
    disabledValues?: string[],

    // Колбэк для поднятия состояния
    onChange: (values: string[]) => void,

    // Дополнительный CSS-class компонента
    className?: string,

    // Дополнительный CSS-class элемента списка.
    itemClassName?: string,

    // Признак, есть ли ошибка
    hasError?: boolean,

    // ID для тестирования
    dataTestId?: string,

    // Признак авто фокуса.
    autoFocus?: boolean,
};
