import { MultiSelectSize } from './constants';

/**
 * Данные для отрисовки одного элемента селекта
 */
export type TMultiSelectItem = {
    // Значение опции
    value: string,

    // Текстовое описание
    title: string,

    // Текст всплывающей подсказки
    tooltip?: string,
};

export type TMultiSelectProps = {
    // Ширина компонента
    width?: typeof MultiSelectSize [keyof typeof MultiSelectSize],

    // ID селекта
    id?: string,

    // Дополнительный CSS-class компонента
    className?: string,

    // Список атрибутов опций селекта
    selectOptions: TMultiSelectItem[],

    // Колбэк при изменении селекта
    onChange: (value: string[]) => void,

    // Текущее values селекта
    values: string[],

    // Плейсхолдер
    placeholder?: string,

    // Признак, что для заполненного режима надо показать отдельный стиль
    hasFilledStyle?: boolean,

    // Признак, есть ли ошибка
    hasError?: boolean,

    // Отдельное значение, при выборе которого сбрасывается выбор с других чекбоксов. И наоборот, при выборе обычного
    // чекбокса снимается выбор с отдельного значения.
    resetValues?: string[],

    // ID для тестирования
    dataTestId?: string,

    // Признак авто фокуса.
    autoFocus?: boolean,
};
