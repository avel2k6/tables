/**
 * Пропсы компонента
 */
export type TCheckboxProps = {
    // Текущее состояние чекбокса
    checked: boolean,

    // Значение, за которое отвечает чекбокс
    value: string,

    // Колбек для поднятия состояния чекбокса
    onChange: (checked: boolean) => void,

    // Дополнительный CSS-class компонента
    className?: string,

    // `ID` чекбокса и `for` для label.
    id?: string,

    // Label
    label?: string,

    // Признак, есть ли ошибка
    hasError?: boolean,

    // Текст всплывающей подсказки
    tooltip?: string,

    // Активен чекбокс или нет
    disabled?: boolean,

    // ID для тестирования
    dataTestId?: string,

    // Признак авто фокуса.
    autoFocus?: boolean,
};
