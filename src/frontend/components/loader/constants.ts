export const classes = {
    component: 'cons-loader',
    small: 'cons-loader_small',
    spinner: 'cons-loader_spinner',
    success: 'cons-loader_success',
    warning: 'cons-loader_warning',
};

/**
 * Состояние загрузки fetch
 */
export const fetchStateStatus = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;
