import { directions } from './constants';

/**
 * Данные для отрисовки отдельного элемента коллекции радиокнопок
 */
type TMultiRadioItem = {
    // ID radio-кнопки для связи с label
    id: string,

    // Значение, за которое отвечает радиокнопка
    value: string,

    // Label радиокнопки
    label: string
};

/**
 * Пропсы компонента
 */
export type TMultiRadioProps = {
    // Данные для отрисовки всех радиокнопок
    items: TMultiRadioItem[],

    // Значение выбранной радиокнопки
    value: string,

    // Колбек для поднятия состояния
    onChange: (value: string) => void,

    // Дополнительный class компонента
    className?: string,

    // Признак, есть ли ошибка
    hasError?: boolean,

    // Общее имя радиокнопок
    name?: string,

    // Направление отрисовки компонентов радиокнопок. Аналог flex-flow
    flow?: typeof directions[keyof typeof directions],

    // ID для тестирования
    dataTestId?: string,

    // Признак авто фокуса.
    autoFocus?: boolean,
};
