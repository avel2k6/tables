import { isObject } from '../../helpers/object';

import { AUTHORIZATION_ERROR_CODE, COMMON_ERROR } from './constants';
import {
    TApiError,
    TCommonError,
    TBackendErrorsMapData,
    TRequestError,
    TResponseBlobError,
    TResponseError,
    TRequestAbortError,
    TApiMappedErrors,
    TFormErrors,
} from './interfaces';

/**
 * Type Guard для определения, что перед нами обычная ошибка.
 * @param err - объект с ошибкой.
 */
export const isCommonError = (err: any): err is TCommonError => isObject(err)
    && err.message
    && err.name;

/**
 * Type Guard для определения, что перед нами ошибка из ответа при запросе файла.
 * @param err - объект с ошибкой.
 */
export const isBlobResponseError = (err: any): err is TResponseBlobError => isObject(err)
    && err.message
    && err.name
    && err.response
    && err.response.data
    && err.response.data instanceof Blob
    && err.response.data.type
    && err.response.data.type.toLowerCase().indexOf('json') !== -1;

/**
 * Type Guard для определения, что перед нами ошибка из ответа при запросе.
 * @param err - объект с ошибкой.
 */
export const isResponseError = (err: any): err is TResponseError => isObject(err)
    && err.message
    && err.name
    && err.response
    && err.response.data
    && err.response.data.errors
    && Array.isArray(err.response.data.errors);

/**
 * Type Guard для определения, что перед нами ошибка, возникшая на этапе запроса.
 * @param err - объект с ошибкой.
 */
export const isRequestAbortError = (err: any): err is TRequestAbortError => isObject(err)
    && err.message
    && err.name
    && !err.response
    && err.request
    && err.config
    && err.config.signal
    && err.config.signal.reason;

/**
 * Type Guard для определения, что перед нами ошибка, возникшая на этапе запроса.
 * @param err - объект с ошибкой.
 */
export const isRequestError = (err: any): err is TRequestError => isObject(err)
    && err.message
    && err.name
    && !err.response
    && err.request;

/**
 * Определяем, что ошибка произошла в связи с нехваткой авторизации.
 * @param err - объект с ошибкой.
 */
export const isForbiddenRequest = (err: TResponseBlobError | TResponseError) => err.response.status === AUTHORIZATION_ERROR_CODE;

/**
 * Находим ближайший подходящий ключ в backendErrorsMapData, которы бы максимально походил на pointer.
 * @param pointer - исходный указатель на ошибку.
 * @param backendErrorsMapData - Разметка ошибок.
 */
export const findClosestKey = (pointer: string, backendErrorsMapData: TBackendErrorsMapData): string | null => {
    const keys = Object
        .keys(backendErrorsMapData)
        .filter((key: string) => pointer.includes(key));

    if (keys.length === 0) {
        return null;
    }
    // Находим самый длинный ключ, он подходит больше всего
    return keys.reduce(
        (previous, current) => (previous.length > current.length
            ? previous
            : current),
        '',
    );
};

/**
 * Получение списка ошибок из АПИ.
 * @param err - объект ошибки при ответе на запрос.
 */
export const getApiErrorsFromError = (err: TResponseError) => err.response.data.errors;

/**
 * Редьюсер для разметки ошибок из АПИ.
 * @param backendErrorsMapData - Объект с набором правил для разметки API ошибок.
 */
const mapApiErrorsToFormFieldsReducer = (backendErrorsMapData: TBackendErrorsMapData) => (
    acc: TApiMappedErrors,
    apiError: TApiError,
): TApiMappedErrors => {
    // Если у ошибки есть pointer, указывающий на поле и мы можем его обработать (есть данные в backendErrorsMapData),
    // то присваиваем ошибке ключ поля. В противном случае считаем ошибку COMMON_ERROR
    if (apiError.source && apiError.source.pointer) {
        const closestKey = findClosestKey(apiError.source.pointer, backendErrorsMapData);
        const keyName = backendErrorsMapData[closestKey] || COMMON_ERROR;
        return {
            ...acc,
            [keyName]: apiError,
        };
    }
    // Если у ошибки есть parameter, указывающий на атрибут и мы можем его обработать (есть данные в backendErrorsMapData),
    // то присваиваем ошибке ключ поля. В противном случае считаем ошибку COMMON_ERROR
    if (apiError.source && apiError.source.parameter) {
        const closestKey = findClosestKey(apiError.source.parameter, backendErrorsMapData);
        const keyName = backendErrorsMapData[closestKey] || COMMON_ERROR;
        return {
            ...acc,
            [keyName]: apiError,
        };
    }
    // Если нет ни pointer, ни parameter,  считаем ошибку COMMON_ERROR
    return {
        ...acc,
        [COMMON_ERROR]: apiError,
    };
};

/**
 * Разметка ошибок из АПИ по полям формы. Сопоставляем ошибки с полями, которые есть на форме.
 * Ошибки, которые ну удалось сопоставить, попадают в свойство `COMMON`.
 * @param errors - список ошибок из АПИ.
 * @param backendErrorsMapData - Объект с правилами для разметки API ошибок, вида `{'указатель на ошибку backend': 'указатель на ошибку frontend'}`.
 * @returns - На выходе получим объект вида `{'поле': {detail: 'текст ошибки', code: 'КОД_ОШИБКИ'}}`.
 */
export const mapApiErrorsToFormFields = (errors: TApiError[], backendErrorsMapData: TBackendErrorsMapData): TApiMappedErrors => errors
    .reduce<TApiMappedErrors>(mapApiErrorsToFormFieldsReducer(backendErrorsMapData), {});

/**
 * Редьюсер для `mapUnhandledErrors`.
 * @param acc - аккумулятор
 * @param key - поле с ошибкой.
 * @param err - ошибка.
 */
const unhandledErrorsReducer = (acc: TFormErrors, [key, err]: [key: string, err: TApiError]): TFormErrors => {
    if (key === COMMON_ERROR) {
        return acc;
    }
    return { ...acc, [key]: err.detail };
};

/**
 * Преобразовывает структуру `TApiMappedErrors` в `TFormErrors`, которую легко распределить по полям формы.
 * Удаляем COMMON ошибку, она не нужна на форме.
 * @param errors - размеченные ошибки из АПИ.
 * @returns - На выходе получим объект вида `{'поле': 'текст ошибки'}`
 */
export const mapUnhandledErrors = (errors: TApiMappedErrors) => Object
    .entries(errors)
    .reduce<TFormErrors>(unhandledErrorsReducer, {});

/**
 * Парсим ошибку в ответе на получение файла.
 * @param text - строка с закодированным JSON.
 */
export const parseBlobErrors = (text: string): TApiError[] => {
    try {
        const parsedData = JSON.parse(text);
        return parsedData.errors;
    } catch (e) {
        return null;
    }
};

/**
 * Получение текста первой ошибки, которая может возникнуть при ajax-запросе.
 * @param {any} e - объект ошибки
 * @returns {string} Текст ошибки
 */
export const getErrorMessage = (e: any) => (e.response && e.response.data.errors ? e.response.data.errors[0].detail : e.toString());
