import { TCountConfig, TCountTypes } from './interfaces';

export const classes = {
    component: 'pagination',
    item: 'pagination__item',
    itemDisabled: 'pagination__item_disabled',
    itemActive: 'pagination__item_active',
};
export const text = {
    first: '«',
    prev: '‹',
    ellipsis: '…',
    next: '›',
    last: '»',
};

export const sizeConfigs: { [key in TCountTypes]: TCountConfig } = {
    default: {
        length: 7,
        lever: 3,
    },
    small: {
        length: 5,
        lever: 2,
    },
} as const;

/**
 *  Определяет максимальное количество страниц,
 *  при котором все страницы отображаются без использования эллипсиса.
 */
export const MAX_PAGES_BEFORE_ELLIPSIS = 5;
