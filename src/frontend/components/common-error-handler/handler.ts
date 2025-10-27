import React from 'react';
import { CommonErrorHandler } from './index';

import { notify } from '../notify';
import {
    getApiErrorsFromError,
    isBlobResponseError,
    isCommonError,
    isForbiddenRequest,
    isRequestAbortError,
    isRequestError,
    isResponseError,
    mapApiErrorsToFormFields,
    mapUnhandledErrors,
    parseBlobErrors,
} from '../errors';
import { COMMON_ERROR } from '../errors/constants';

import { texts } from './constants';

/**
 * Тип с пропсами компонента CommonErrorHandler
 */
type CommonProps = React.ComponentProps<typeof CommonErrorHandler>;

/**
 * Общий обработчик поступающих ошибок
 *
 * Подробности:
 * Если ошибка происходит из-за недостаточного уровня доступа (403), то пользователю предлагается повторить логин в систему.
 * Если ошибка происходит из-за неправильного запроса (400), то ошибка выводится в нотифере на несколько секунд.
 * Если ошибка происходит по известным причинам (указано в pointer) и указано, как с ней поступить (есть маппинг backendMapData),
 * то она возвращается для дальнейшей самостоятельной обработки.
 *
 * @param err - Объект ошибки.
 * @param backendMapData - Объект с набором правил для маппинга API ошибок, вида {'указатель на ошибку backend': 'указатель на ошибку frontend'}
 * @param unhandledErrorsCallback - Колбек, прокидывающий ошибки, которые были конвертированы через маппинг, но не были показаны в UI.
 */
export const handleError: CommonProps['handleError'] = async (err, backendMapData = {}, unhandledErrorsCallback = () => {}) => {
    // Если пришла простая строка.
    if (typeof err === 'string') {
        console.error(err);
        notify.error(err);
        return;
    }

    // Если получили ответ от сервера и понимаем, что проблема с авторизацией.
    if ((isBlobResponseError(err) && isForbiddenRequest(err))
            || (isResponseError(err) && isForbiddenRequest(err))) {
        console.error(err);
        notify.error(err.message);
        return;
    }

    // Если получили ответ от сервера при запросе файла (Работаем с BLOB).
    if (isBlobResponseError(err)) {
        const text = await err.response.data.text();
        const errors = parseBlobErrors(text);

        if (!errors || errors.length === 0) {
            notify.error(err.message);
            return;
        }

        // Ошибки из АПИ, размеченные по полям.
        const mappedErrors = mapApiErrorsToFormFields(errors, backendMapData);

        // Текст ошибок из АПИ, размеченный по полям.
        unhandledErrorsCallback(mapUnhandledErrors(mappedErrors));

        // Ошибку, которую не удалось разметить, показываем
        if (mappedErrors[COMMON_ERROR]) {
            console.error(err);
            notify.error(
                {
                    text: mappedErrors[COMMON_ERROR].detail,
                    code: mappedErrors[COMMON_ERROR].code,
                },
            );
        }
        return;
    }

    // Если получили обычный читаемый ответ от сервера (Работаем с JSON).
    if (isResponseError(err)) {
        const apiErrors = getApiErrorsFromError(err);

        // Размеченные ошибки, которые надо показать особым образом
        const mappedErrors = mapApiErrorsToFormFields(apiErrors, backendMapData);

        // Возвращаем обратно размеченные ошибки без COMMON_ERROR
        unhandledErrorsCallback(mapUnhandledErrors(mappedErrors));

        // Ошибку, которую не удалось разметить, показываем
        if (mappedErrors[COMMON_ERROR]) {
            console.error(err);
            notify.error({
                text: mappedErrors[COMMON_ERROR].detail,
                code: mappedErrors[COMMON_ERROR].code,
            });
        }
        return;
    }

    // Если ошибка вызвана принудительным прерывание запроса.
    if (isRequestAbortError(err)) {
        console.error(err);
        notify.error(err.config.signal.reason.toString());
        return;
    }

    // Если ошибка произошла на моменте запроса
    if (isRequestError(err)) {
        console.error(err);
        notify.error({
            text: err.message,
            code: err.name,
        });
        return;
    }

    // Любая другая ошибка
    if (isCommonError(err)) {
        console.error(err);
        notify.error(err.message);
        return;
    }
    console.error(texts.cantHandleError, err);
};
