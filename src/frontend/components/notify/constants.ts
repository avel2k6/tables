/**
 * Время показа уведомления по умолчанию
 */
export const DEFAULT_AUTO_CLOSE_DELAY_MS = 5000;

/**
 * Задержка перед появлением уведомления
 */
export const START_DELAY_MS = 10;

/**
 * Время анимации появления уведомления
 */
export const APPEARANCE_DELAY_MS = 300;

/**
 * Время анимации удаления уведомления
 */
export const CLOSING_DELAY_MS = 200;

/**
 * Варианты тем уведомления
 */
export enum Theme {
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
}

export const classes = {
    component: 'notify',
    container: 'notify__container',
    body: 'notify__body',
    shownBody: 'notify__body_shown',
    hiddenBody: 'notify__body_hidden',
    icon: 'notify__icon',
    text: 'notify__text',
    code: 'notify__code',
    closeButton: 'notify__close-button',
    progressBar: 'notify__progress-bar',
};

export const texts = {
    close: 'Закрыть',
    errors: {
        notCustomEvent: 'It\'s not a CustomEvent.',
    },
};


