import { TTextData } from '../components/notify/interfaces';

let id = 0;

/**
 * Генерация ID
 * @returns {number} Новое ID
 */
export const generateId = (prefix = ''): string => {
    id += 1;
    return `${prefix}_${id}`;
};

/**
 * Проверка, принадлежит ли событие к CustomEvent
 * @param {Event} event - событие
 * @returns {boolean} Является ли событие CustomEvent
 */
export const isCustomEvent = (event: Event): event is CustomEvent => 'detail' in event;

/**
 * Проверка, что приходящие данные являются объектом с данными для нотифая.
 * @param data
 */
export const isTextData = (data: any): data is TTextData => data instanceof Object && 'text' in data;
