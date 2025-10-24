import { selectSize, selectWith } from './constants';

/**
 * Данные для отрисовки отдельного элемента селекта
 */
type TSelectItem = {
    // Значение элемента селекта
    value: string,

    // Текст элемента селекта
    title: string,

    // Подсказка элемента селекта
    tooltip?: string,
};

export type TSelectProps = {
    // Текущее value селекта
    value: string,

    // Список атрибутов опций селекта
    selectOptions: TSelectItem[],

    // Колбэк при изменении селекта
    onChange: (value: string) => void,

    // Ширина компонента
    width?: typeof selectWith[keyof typeof selectWith],

    // Размер кнопки селекта.
    size?: typeof selectSize[keyof typeof selectSize],

    // ID селекта
    id?: string,

    // Дополнительгый CSS-class селекта
    className?: string,

    // name селекта
    name?: string,

    // Плейсхолдер
    placeholder?: string,

    // Признак, что для заполненного режима надо показать отдельный стиль
    hasFilledStyle?: boolean,

    // Признак, есть ли ошибка
    hasError?: boolean,

    // ID для тестирования
    dataTestId?: string,

    // Признак авто фокуса.
    autoFocus?: boolean,
};
