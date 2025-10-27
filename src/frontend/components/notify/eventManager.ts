/**
 * Диспатчим событие, когда нужно показать уведомление
 * @param eventName - имя события
 * @param data - данные с текстом, кодом и временем показа уведомления
 */
export const publish = (eventName: string, data: {
    text: string,
    autoCloseDelayMs: number,
    code: string | null,
}) => {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
};

/**
 * Подписываемся на возникновение события для генерации уведомления
 * @param {string} eventName - имя события
 * @param {(e: Event) => void} listener - колбэк при возникновении события
 */
export const subscribe = (eventName: string, listener: (e: Event) => void) => {
    document.addEventListener(eventName, listener);
};

/**
 * Отписываемся от прослушивания события для генерации уведомления
 * @param {string} eventName - имя события
 * @param {(e: Event) => void} listener - колбэк при возникновении события
 */
export const unsubscribe = (eventName: string, listener: (e: Event) => void) => {
    document.removeEventListener(eventName, listener);
};
