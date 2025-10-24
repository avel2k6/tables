export const classes = {
    component: 'cons-list-table',
    body: 'cons-list-table__body',
    head: 'cons-list-table__head',
    tr: 'cons-list-table__tr',
    th: 'cons-list-table__th',
    thWrapper: 'cons-list-table__th-wrapper',
    thWrapperResizable: 'cons-list-table__th-wrapper_resizeable',
    thWrapperColspan: 'cons-list-table__th-wrapper_colspan',
    resizer: 'cons-list-table__resizer',
    resizerLeft: 'cons-list-table__resizer-left',
    resizerRight: 'cons-list-table__resizer-right',
    td: 'cons-list-table__td',
};

export const texts = {
    resizer: 'Потяните мышкой для изменения размера ячейки.\n'
        + 'Двойной клик для восстановления исходного размера.\n\n'
        + 'Изменения сохранятся только в вашем браузере.',
};

/**
 * Минимально допустимая ширина ячейки
 */
export const CELL_MIN_WIDTH = 70;

/**
 * Максимально допустимая ширина ячейки
 */
export const CELL_MAX_WIDTH = 600;
