export const classes = {
    component: 'cons-input',
    smallSize: 'cons-input_small',
    error: 'cons-input_error',
    withCounter: 'cons-input_counter',
    small: 'cons-input_w-small',
    medium: 'cons-input_w-medium',
    full: 'cons-input_w-full',
    filled: 'cons-input_filled',
    input: 'cons-input__input',
    inputSmall: 'cons-input__input_small',
    disabled: 'cons-input__input_disabled',
    icon: 'cons-input__icon',
    iconSearch: 'cons-input__icon_search',
    clear: 'cons-input__clear',
    counter: 'cons-input__counter',
};

export const texts = {
    outOf: 'из',
};

/**
 * Ширина инпута
 */
export const inputWidth = {
    SMALL: 'small',
    MEDIUM: 'medium',
    FULL: 'full',
} as const;

/**
 * Размер инпута
 */
export const inputSize = {
    SMALL: 'small',
    DEFAULT: 'default',
} as const;

/**
 * Тип инпута
 */
export const inputTypes = {
    TEXT: 'text',
    NUMBER: 'number',
    TIME: 'time',
} as const;
