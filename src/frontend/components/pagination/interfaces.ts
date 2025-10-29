import React from 'react';

/**
 * Пропсы компонента Pagination.
 */
export type TPaginationProps = {
    /**
     * Текущий номер страницы.
     */
    currentPageNumber: number,

    /**
     * Размер страницы (количество элементов на странице).
     */
    size: number,

    /**
     * Общее количество элементов.
     */
    total: number | null,

    /**
     * Функция, вызываемая при изменении страницы.
     * @param pageNumber Номер страницы.
     */
    onChange: (pageNumber: number) => void,

    /**
     * Элемент, к которому нужно прокрутиться при изменении страницы.
     */
    scrollTo?: HTMLElement,

    /**
     * Количество элементов пагинации.
     */
    itemsCount?: TCountTypes
};

/**
 * Пропсы элемента пагинации.
 */
export type TPaginationElementProps = {
    /**
     * Дочерние элементы (например, текст или иконка).
     */
    children: React.ReactNode,

    /**
     * Функция, вызываемая при клике на элемент.
     */
    onClick?: () => void,

    /**
     * Признак, указывающий, отключен ли элемент.
     */
    disabled?: boolean,

    /**
     * Признак, указывающий, активен ли элемент.
     */
    active?: boolean,
};

/**
 * Количество элементов пагинации.
 */
export type TCountTypes = 'default' | 'small';

/**
 * Конфигурация количества элементов пагинации.
 */
export type TCountConfig = {
    /**
     * Длина пагинации (количество отображаемых элементов).
     */
    length: number,

    /**
     * Плечо пагинации (количество элементов до и после текущей страницы).
     */
    lever: number,
};
