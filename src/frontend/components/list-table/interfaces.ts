import React from 'react';

/**
 * Типы общих пропсов тегов таблицы
 */
export type TCommonListTableProps<T extends HTMLElement = HTMLElement> = {
    // Дети
    children: React.ReactNode | React.ReactNode[] | null,

    // Дополнительный CSS-класс
    className?: string | null,

    // Дополнительные стили
    style?: React.CSSProperties,

    // data-атрибуты
    dataAttributes?: Record<string, unknown>,

    // ref на компонент
    componentRef?: React.RefObject<T>,

    // ID для тестирования
    dataTestId?: string,
};

/**
 * Тип атрибута colspan для ячейки таблицы
 */
type TColSpan = {
    // Устанавливает число ячеек, которые должны быть объединены по горизонтали.
    // Имеет смысл для таблиц, где у ячейки надо задать минимальную ширину через colgroup.
    colSpan?: number,
};

/**
 * Тип пропсов для столбца таблицы
 */
export type TColProps = {
    // Ширина колонки.
    // Имеет смысл для таблиц, где у ячейки надо задать минимальную ширину через colgroup.
    width?: number | null,

    // ID для тестирования
    dataTestId?: string,
};

/**
 * Тип пропсов заголовочной ячейки таблицы
 */
export type ThProps = (TColSpan | (TColSpan & {
    // Позиция компонента. С какого края ячейки следует отображать.
    resizerPosition: 'left' | 'right',

    // Уникальный ID колонки. Используется для сохранения ширины в localStorage
    resizerId: string,
})) & {
    // Атрибут title
    title?: string
};

/**
 * Тип пропсов обычной ячейки таблицы
 */
export type TdProps = TColSpan & {
    onMouseDown?: React.MouseEventHandler<HTMLTableCellElement>,
};

/**
 * Тип пропсов для компонента изменения ширины столбца в таблице
 */
export type TResizerProps = {
    // Позиция компонента. С какого края ячейки следует отображать.
    resizerPosition: 'left' | 'right',

    // Колбэк при движении курсора. Отдаёт новую ширину родительского элемента.
    onChange: (width: number) => void,

    // ID для тестирования
    dataTestId?: string,
};
