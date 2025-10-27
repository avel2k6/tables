import { Theme } from './constants';

/**
 * Тип для отдельного уведомления
 */
export type TNotification = {
    // ID уведомления
    id: number,

    // текст уведомления
    text: string,

    // код уведомления
    code: string,

    // время показа уведомления
    autoCloseDelayMs: number,

    // тема уведомления
    theme: Theme,
};

/**
 * Пропсы и стейт компонента Notification
 */
export type TNotificationProps = {
    // ID уведомления
    id: number,

    // текст уведомления
    text: string,

    // код уведомления
    code?: string,

    // время показа уведомления
    autoCloseDelayMs: number,

    // тема уведомления
    theme: Theme,

    // колбэк для закрытия уведомления
    onClose: (id: number) => void,
};

/**
 * Пропсы компонента ProgressBar
 */
export type TProgressBarProps = {
    // время показа уведомления
    autoCloseDelayMs: number,

    // тема уведомления
    theme: Theme,
};

/**
 * Текстовые данные, передаваемые во всплывающее сообщение.
 */
export type TTextData = {
    text: string,
    code?: string,
};
